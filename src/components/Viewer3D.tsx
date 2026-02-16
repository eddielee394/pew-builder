import { useState, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { useAppSelector } from '../store/hooks'
import { ModelLoader } from './ModelLoader'
import type { Firearm } from '../types'
import type { AttachmentPoint } from '../types'
import type { MountedAccessory } from '../types'

/** Scale from inches to 3D units (receiver ~10" = 2.5 units) */
const INCH_SCALE = 0.2

const RECEIVER_TOP_Y = 0.575

/** Base scale for GLB models - adjust per model if needed */
const FIREARM_SCALE = 0.5
const ACCESSORY_SCALE = 0.3

function getAttachmentPosition(point: AttachmentPoint, accessoryHeight: number): [number, number, number] {
  if (point.position === 'top') {
    const receiverLength = 2.5
    const z = -receiverLength / 2 + point.balancePoint * receiverLength
    const h = accessoryHeight * INCH_SCALE
    const y = RECEIVER_TOP_Y + h / 2
    return [0, y, z]
  }
  if (point.position === 'muzzle') {
    const receiverLength = 2.5
    const z = -(receiverLength / 2 + 0.1)
    return [0, 0.5, z]
  }
  return [0, 0, 0]
}

function PlaceholderFirearm() {
  return (
    <group position={[0, 0.5, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.4, 0.15, 2.5]} />
        <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0, 1.5]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 1.2, 8]} />
        <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[-0.3, 0, -0.5]} castShadow>
        <boxGeometry args={[0.08, 0.4, 0.15]} />
        <meshStandardMaterial color="#374151" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  )
}

function FirearmModel({ firearm }: { firearm: Firearm | null }) {
  if (!firearm) return null
  if (firearm.modelPath) {
    const scale = firearm.modelScale ?? FIREARM_SCALE
    return (
      <ModelLoader
        path={firearm.modelPath}
        node={firearm.modelNode}
        position={[0, 0.5, 0]}
        scale={scale}
      />
    )
  }
  return <PlaceholderFirearm />
}

function MountedAccessoryMesh({ mounted }: { mounted: MountedAccessory }) {
  const { length, height, width } = mounted.accessory.dimensions
  const pos = getAttachmentPosition(mounted.attachmentPoint, height)

  if (mounted.accessory.modelPath) {
    const scale = mounted.accessory.modelScale ?? ACCESSORY_SCALE
    const offset = mounted.accessory.positionOffset ?? [0, 0, 0]
    const rotation = mounted.accessory.rotationOffset ?? [0, 0, 0]
    const finalPos: [number, number, number] = [pos[0] + offset[0], pos[1] + offset[1], pos[2] + offset[2]]
    return (
      <group position={[0, 0.5, 0]}>
        <ModelLoader
          path={mounted.accessory.modelPath}
          node={mounted.accessory.modelNode}
          position={finalPos}
          rotation={rotation}
          scale={scale}
        />
      </group>
    )
  }

  const [w, h, l] = [width * INCH_SCALE, height * INCH_SCALE, length * INCH_SCALE]
  return (
    <group position={[0, 0.5, 0]}>
      <mesh position={pos} castShadow receiveShadow>
        <boxGeometry args={[w, h, l]} />
        <meshStandardMaterial color="#4b5563" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}

function Scene({ firearm, mountedAccessories }: { firearm: Firearm | null; mountedAccessories: MountedAccessory[] }) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <FirearmModel firearm={firearm} />
      {mountedAccessories.map((m) => (
        <MountedAccessoryMesh key={m.accessory.id} mounted={m} />
      ))}
    </>
  )
}

/** Ensures transparent clear so the CSS gradient on .viewer-3d shows through */
function TransparentBackground() {
  const { scene, gl } = useThree()
  useEffect(() => {
    scene.background = null
    gl.setClearColor(0x000000, 0)
  }, [scene, gl])
  return null
}

const DEFAULT_CAMERA_DISTANCE = 4

function getCameraPosition(firearm: Firearm | null): [number, number, number] {
  const dist = firearm?.cameraDistance ?? DEFAULT_CAMERA_DISTANCE
  const angle = Math.PI / 4
  const x = dist * Math.cos(angle) * 0.7
  const z = dist * Math.sin(angle) * 0.7
  const y = dist * 0.5
  return [x, y, z]
}

export function Viewer3D() {
  const [resetKey, setResetKey] = useState(0)
  const selectedFirearm = useAppSelector((s) => s.configurator.selectedFirearm)
  const mountedAccessories = useAppSelector((s) => s.configurator.mountedAccessories)
  const cameraPos = getCameraPosition(selectedFirearm)

  return (
    <div className="viewer-3d">
      <button
        type="button"
        className="reset-zoom-btn"
        onClick={() => setResetKey((k) => k + 1)}
        title="Reset zoom and view"
      >
        Reset Zoom
      </button>
      <Canvas
        key={`${selectedFirearm?.id ?? 'none'}-${resetKey}`}
        shadows
        camera={{ position: cameraPos, fov: 50 }}
        gl={{ alpha: true }}
      >
        <TransparentBackground />
        <Suspense fallback={null}>
          <Scene firearm={selectedFirearm} mountedAccessories={mountedAccessories} />
        </Suspense>
        <OrbitControls
          target={[0, 0.5, 0]}
          enablePan
          screenSpacePanning
          minDistance={0.3}
          maxDistance={selectedFirearm?.cameraDistance ? selectedFirearm.cameraDistance * 2.5 : 15}
        />
      </Canvas>
    </div>
  )
}
