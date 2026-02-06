import type { MountAdapter } from '../types'

export const adapters: MountAdapter[] = [
  {
    id: 'acro-to-picatinny-plate',
    name: 'ACRO to Picatinny adapter plate',
    fromMount: 'acro',
    toMount: 'picatinny',
    height: 0,
    weight: 0.5,
  },
  {
    id: 'rmsc-to-picatinny-plate',
    name: 'RMSc to Picatinny adapter plate',
    fromMount: 'rmsc',
    toMount: 'picatinny',
    height: 0,
    weight: 0.3,
  },
  {
    id: 'rmsc-to-dovetail-plate',
    name: 'RMSc to dovetail adapter plate',
    fromMount: 'rmsc',
    toMount: 'dovetail',
    height: 0,
    weight: 0.3,
  },
]
