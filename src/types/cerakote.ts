/**
 * Cerakote color/finish option for firearm customization.
 */
export interface CerakoteColor {
  id: string
  name: string
  /** Hex color for UI preview */
  hex: string
  /** Cerakote product code if applicable */
  productCode?: string
}

/**
 * Multi-color pattern (e.g., camo, two-tone).
 */
export interface CerakotePattern {
  id: string
  name: string
  /** Colors used in this pattern, in order */
  colorIds: string[]
  /** Path to texture/mask for 3D application */
  texturePath?: string
}
