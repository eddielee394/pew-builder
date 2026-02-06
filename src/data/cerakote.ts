import type { CerakoteColor, CerakotePattern } from '../types'

export const cerakoteColors: CerakoteColor[] = [
  { id: 'black', name: 'Graphite Black', hex: '#1a1a1a', productCode: 'H-190' },
  { id: 'fde', name: 'Magpul FDE', hex: '#a67c52', productCode: 'H-265' },
  { id: 'odg', name: 'Olive Drab', hex: '#4a5d23', productCode: 'H-235' },
  { id: 'tungsten', name: 'Tungsten', hex: '#5c5c5c', productCode: 'H-237' },
  { id: 'burnt-bronze', name: 'Burnt Bronze', hex: '#8b6914', productCode: 'H-148' },
]

export const cerakotePatterns: CerakotePattern[] = [
  { id: 'solid', name: 'Solid', colorIds: [] },
  { id: 'two-tone', name: 'Two-tone', colorIds: ['black', 'tungsten'] },
  { id: 'ranger-green', name: 'Ranger Green', colorIds: ['odg', 'black'] },
]
