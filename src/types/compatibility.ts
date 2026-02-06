import type { Firearm } from './firearm'
import type { Accessory } from './accessory'
import type { AttachmentPoint } from './firearm'

/**
 * Result of checking if an accessory can mount to a firearm.
 */
export interface CompatibilityResult {
  compatible: boolean
  /** Attachment point(s) where this accessory can be mounted */
  validPoints: AttachmentPoint[]
  /** Adapter/plate IDs required for each valid point */
  requiredAdapters: Record<string, string[]>
  /** Reason if not compatible */
  reason?: string
}

/**
 * Check if an accessory is compatible with a firearm.
 * Returns attachment points where it can be mounted and any required adapters.
 */
export function checkCompatibility(
  firearm: Firearm,
  accessory: Accessory
): CompatibilityResult {
  const validPoints: AttachmentPoint[] = []
  const requiredAdapters: Record<string, string[]> = {}

  for (const point of firearm.attachmentPoints) {
    if (point.mountType === accessory.mountType) {
      validPoints.push(point)
      requiredAdapters[point.id] = []
    } else {
      const adapterIds = accessory.adapters?.[point.mountType]
      if (adapterIds && adapterIds.length > 0) {
        validPoints.push(point)
        requiredAdapters[point.id] = adapterIds
      }
    }
  }

  if (validPoints.length === 0) {
    return {
      compatible: false,
      validPoints: [],
      requiredAdapters: {},
      reason: `No compatible attachment points. Accessory uses ${accessory.mountType}, firearm has ${firearm.attachmentPoints.map((p) => p.mountType).join(', ')}`,
    }
  }

  return {
    compatible: true,
    validPoints,
    requiredAdapters,
  }
}
