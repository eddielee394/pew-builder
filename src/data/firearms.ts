import type { Firearm } from '../types'

export const firearms: Firearm[] = [
  {
    id: 'winchester-1854-357',
    name: 'Model 1854',
    manufacturer: 'Winchester',
    model: '1854',
    caliber: '.357 Magnum',
    baseWeight: 96, // oz (~6 lbs)
    dimensions: { length: 38, height: 5, width: 2 },
    attachmentPoints: [
      {
        id: 'top-receiver',
        name: 'Top receiver',
        mountType: 'dovetail',
        position: 'top',
        balancePoint: 0.35,
      },
      {
        id: 'top-rail',
        name: 'Picatinny rail (optional)',
        mountType: 'picatinny',
        position: 'top',
        balancePoint: 0.35,
      },
      {
        id: 'muzzle',
        name: 'Muzzle (threaded)',
        mountType: 'muzzle',
        position: 'muzzle',
        balancePoint: 1,
      },
    ],
  },
  {
    id: 'cz-scorpion-evo-3-s1',
    name: 'Scorpion EVO 3 S1',
    manufacturer: 'CZ',
    model: 'Scorpion EVO 3 S1',
    caliber: '9mm',
    baseWeight: 80, // oz (~5 lbs)
    dimensions: { length: 28, height: 8, width: 2 },
    attachmentPoints: [
      {
        id: 'top-rail',
        name: 'Picatinny rail',
        mountType: 'picatinny',
        position: 'top',
        balancePoint: 0.4,
      },
      {
        id: 'muzzle',
        name: 'Muzzle (threaded)',
        mountType: 'muzzle',
        position: 'muzzle',
        balancePoint: 1,
      },
    ],
    modelPath: 'guns/cz_scorpion_evo_3_s1_low_res.glb',
  },
  {
    id: 'hk-mp5',
    name: 'MP5',
    manufacturer: 'Heckler & Koch',
    model: 'MP5',
    caliber: '9mm',
    baseWeight: 96, // oz (~6 lbs)
    dimensions: { length: 27, height: 8, width: 2 },
    attachmentPoints: [
      {
        id: 'top-rail',
        name: 'Picatinny rail',
        mountType: 'picatinny',
        position: 'top',
        balancePoint: 0.4,
      },
      {
        id: 'muzzle',
        name: 'Muzzle (threaded)',
        mountType: 'muzzle',
        position: 'muzzle',
        balancePoint: 1,
      },
    ],
    modelPath: 'guns/hk_mp5.glb',
    modelScale: 0.01,
    cameraDistance: 25,
  },
  {
    id: 'cz-61-scorpion',
    name: 'Škorpion vz. 61',
    manufacturer: 'CZ',
    model: '61',
    caliber: '.32 ACP',
    baseWeight: 28, // oz (~1.75 lbs)
    dimensions: { length: 17, height: 5, width: 1.5 },
    attachmentPoints: [
      {
        id: 'top-receiver',
        name: 'Top receiver',
        mountType: 'picatinny',
        position: 'top',
        balancePoint: 0.35,
      },
      {
        id: 'muzzle',
        name: 'Muzzle (threaded)',
        mountType: 'muzzle',
        position: 'muzzle',
        balancePoint: 1,
      },
    ],
    modelPath: 'guns/scorpion_cz-61_low_res.glb',
    modelScale: 0.01,
    cameraDistance: 25,
  },
]
