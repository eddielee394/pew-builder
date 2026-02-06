import type { Firearm } from './firearm'
import type { Accessory } from './accessory'
import type { AttachmentPoint } from './firearm'

/**
 * An accessory mounted to a specific attachment point.
 * Tracks adapters required for the build list.
 */
export interface MountedAccessory {
  accessory: Accessory
  attachmentPoint: AttachmentPoint
  /** Adapter/plate IDs required for this mount */
  requiredAdapters: string[]
}

/**
 * Complete build configuration - firearm + all mounted accessories.
 */
export interface Build {
  firearm: Firearm
  mountedAccessories: MountedAccessory[]
  cerakoteColorId?: string
  cerakotePatternId?: string
}
