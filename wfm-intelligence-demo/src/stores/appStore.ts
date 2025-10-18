import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface AppState {
  count: number
  incrementCount: () => void
  decrementCount: () => void
  resetCount: () => void
}

export const useAppStore = create<AppState>()(
  immer((set) => ({
    count: 0,
    incrementCount: () =>
      set((state) => {
        state.count += 1
      }),
    decrementCount: () =>
      set((state) => {
        state.count -= 1
      }),
    resetCount: () =>
      set((state) => {
        state.count = 0
      }),
  }))
)
