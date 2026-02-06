import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Firearm } from '../../types'
import type { MountedAccessory } from '../../types'
import { firearms } from '../../data/firearms'

const defaultFirearm = firearms.find((f) => f.id === 'hk-mp5') ?? null

export interface ConfiguratorState {
  selectedFirearm: Firearm | null
  mountedAccessories: MountedAccessory[]
  cerakoteColorId: string | null
  cerakotePatternId: string | null
  /** Forend weight as % of total - e.g. 0.4 = warn if forend > 40% */
  balanceWarningThreshold: number
}

const initialState: ConfiguratorState = {
  selectedFirearm: defaultFirearm,
  mountedAccessories: [],
  cerakoteColorId: null,
  cerakotePatternId: null,
  balanceWarningThreshold: 0.4,
}

const configuratorSlice = createSlice({
  name: 'configurator',
  initialState,
  reducers: {
    setFirearm: (state, action: PayloadAction<Firearm | null>) => {
      state.selectedFirearm = action.payload
      state.mountedAccessories = []
    },
    addAccessory: (state, action: PayloadAction<MountedAccessory>) => {
      state.mountedAccessories.push(action.payload)
    },
    removeAccessory: (state, action: PayloadAction<string>) => {
      state.mountedAccessories = state.mountedAccessories.filter(
        (m) => m.accessory.id !== action.payload
      )
    },
    clearAccessories: (state) => {
      state.mountedAccessories = []
    },
    setCerakoteColor: (state, action: PayloadAction<string | null>) => {
      state.cerakoteColorId = action.payload
    },
    setCerakotePattern: (state, action: PayloadAction<string | null>) => {
      state.cerakotePatternId = action.payload
    },
    setBalanceWarningThreshold: (state, action: PayloadAction<number>) => {
      state.balanceWarningThreshold = action.payload
    },
    resetConfigurator: () => initialState,
  },
})

export const {
  setFirearm,
  addAccessory,
  removeAccessory,
  clearAccessories,
  setCerakoteColor,
  setCerakotePattern,
  setBalanceWarningThreshold,
  resetConfigurator,
} = configuratorSlice.actions

export default configuratorSlice.reducer
