import { configureStore } from '@reduxjs/toolkit'
import cardSlice from './slices/cardSlice'


export const store = configureStore({
  reducer: {
    card: cardSlice,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch