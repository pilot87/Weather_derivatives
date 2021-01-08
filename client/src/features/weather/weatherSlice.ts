import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {AppThunk, RootState} from '../../app/store'
import {useDispatch} from 'react-redux'


export interface Weather {
    // name: string,
    current_temp: number,
    hourly_temp: number[],
    current_wind_speed: number,
    hourly_wind_speed: number[],
    current_clouds: number,
    hourly_clouds: number[],
    current_pressure: number,
    hourly_pressure: number[],
    current_humidity: number,
    hourly_humidity: number[],
    current_visibility: number,
    hourly_visibility: number[]
}

export interface WeatherMap {
    [index: string]: Weather
}

export interface WeatherAll {
    weather: WeatherMap
}

const initialState: WeatherAll = {
    weather: {}
}

export const authSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        update_weather(state: WeatherAll, action: PayloadAction<WeatherMap>) {
            state.weather = action.payload
        }
    }
})

export const { update_weather } = authSlice.actions

export default authSlice.reducer
