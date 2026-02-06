/**
 * Mount types for firearm attachment systems.
 * Used to determine accessory compatibility.
 */
export const MOUNT_TYPES = [
  'picatinny',
  'mlok',
  'keymod',
  'dovetail',
  'weaver',
  'rmsc',
  'rmsc-shield',
  'rmsc-plus',
  'acro',
  'aimpoint-micro',
  'aimpoint-comp',
  'muzzle',
] as const

export type MountType = (typeof MOUNT_TYPES)[number]

/**
 * Adapter plates/risers required to mount an optic to a given interface.
 * e.g., RMSc optic on Picatinny rail needs a plate.
 */
export interface MountAdapter {
  id: string
  name: string
  fromMount: MountType
  toMount: MountType
  height: number // mm - riser height if applicable
  weight: number // oz
}
