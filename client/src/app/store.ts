import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import weatherReducer from '../features/weather/weatherSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
