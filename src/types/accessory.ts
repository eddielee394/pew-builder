import type { MountType } from './mount'
import type { Dimensions } from './common'

export const ACCESSORY_CATEGORIES = ['optics', 'suppressors'] as const
export type AccessoryCategory = (typeof ACCESSORY_CATEGORIES)[number]

export const ACCESSORY_TYPES = [
  'optic',
  'red-dot',
  'magnifier',
  'scope',
  'light',
  'laser',
  'sling',
  'grip',
  'foregrip',
  'bipod',
  'muzzle-device',
  'other',
] as const

export type AccessoryType = (typeof ACCESSORY_TYPES)[number]

/**
 * Accessory base schema.
 * Represents a real-world manufacturer accessory.
 */
export interface Accessory {
  id: string
  name: string
  manufacturer: string
  type: AccessoryType
  /** Weight in ounces */
  weight: number
  dimensions: Dimensions
  /** Native mount interface - what it attaches to directly */
  mountType: MountType
  /** Adapter IDs required when mounting to different interfaces */
  adapters?: Partial<Record<MountType, string[]>>
  /** Path to 3D model (GLB/GLTF) */
  modelPath?: string
  /** Extract specific node from multi-item GLB: node name (string) or child index (number) */
  modelNode?: string | number
  /** Override scale for this model - GLB files can have different internal units */
  modelScale?: number
  /** Position offset [x, y, z] to fine-tune placement on rail - e.g. [0, -0.05, 0] to lower */
  positionOffset?: [number, number, number]
  /** Rotation [x, y, z] in radians - e.g. [0, Math.PI, 0] to flip 180° around Y */
  rotationOffset?: [number, number, number]
  /** Optional MSRP for cost estimation */
  msrp?: number
  /** Category for UI grouping */
  category: AccessoryCategory
}
