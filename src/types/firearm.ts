import type { MountType } from './mount'
import type { Dimensions } from './common'

/**
 * Attachment point on a firearm where accessories can be mounted.
 */
export interface AttachmentPoint {
  id: string
  name: string // e.g., "Top rail", "Forend 3 o'clock"
  mountType: MountType
  position: 'top' | 'side' | 'bottom' | 'muzzle'
  /** Weight distribution: 0 = rear (stock), 1 = front (muzzle). Used for balance calc. */
  balancePoint: number
  /** Optional: max accessory weight at this point before balance warning */
  maxWeight?: number
}

/**
 * Firearm base schema.
 * Represents a real-world manufacturer firearm.
 */
export interface Firearm {
  id: string
  name: string
  manufacturer: string
  model: string
  caliber: string
  /** Base weight in ounces (unloaded, no accessories) */
  baseWeight: number
  dimensions: Dimensions
  /** Where accessories can be attached */
  attachmentPoints: AttachmentPoint[]
  /** Path to 3D model (GLB/GLTF) */
  modelPath?: string
  /** Extract specific node from multi-item GLB: node name (string) or child index (number) */
  modelNode?: string | number
  /** Override scale for this model - GLB files can have different internal units. */
  modelScale?: number
  /** Camera distance for initial view - larger = zoomed out. Override for models with different scale. */
  cameraDistance?: number
}
