import type * as THREE from 'three'
import { useGLTF, Clone } from '@react-three/drei'
import { getModelUrl } from '../models'

interface ModelLoaderProps {
  path: string
  /** Extract specific node from multi-item GLB: node name (string) or child index (number) */
  node?: string | number
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  castShadow?: boolean
  receiveShadow?: boolean
}

export function ModelLoader({
  path,
  node,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  castShadow = true,
  receiveShadow = true,
}: ModelLoaderProps) {
  const url = getModelUrl(path)
  if (!url) return null

  return (
    <ModelLoaderInner
      url={url}
      node={node}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    />
  )
}

interface ModelLoaderInnerProps extends Omit<ModelLoaderProps, 'path'> {
  url: string
}

function getObjectFromScene(scene: THREE.Object3D, node: string | number): THREE.Object3D | null {
  if (typeof node === 'number') {
    const child = scene.children[node]
    return child ?? null
  }
  const found = scene.getObjectByName(node)
  return found ?? null
}

function ModelLoaderInner({
  url,
  node,
  position,
  rotation,
  scale,
  castShadow,
  receiveShadow,
}: ModelLoaderInnerProps) {
  const { scene } = useGLTF(url, false)
  const scaleArr = Array.isArray(scale) ? scale : [scale, scale, scale]
  const object = node !== undefined ? getObjectFromScene(scene, node) : scene
  if (!object) return null

  return (
    <group position={position} rotation={rotation} scale={scaleArr as [number, number, number]}>
      <Clone object={object} castShadow={castShadow} receiveShadow={receiveShadow} />
    </group>
  )
}
