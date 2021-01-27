import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'

import authReducer from '../features/auth/authSlice'
import weatherReducer from '../features/weather/weatherSlice'
import derivativeReducer from '../features/derivative/derivativeSlice'
import statsReducer from '../features/stats/statsSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
    derivative: derivativeReducer,
    stats: statsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
