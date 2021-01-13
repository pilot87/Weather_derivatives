import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Weather {
    current_temp: number
    hourly_temp: number[]
    current_wind_speed: number
    hourly_wind_speed: number[]
    current_clouds: number
    hourly_clouds: number[]
    current_pressure: number
    hourly_pressure: number[]
    current_humidity: number
    hourly_humidity: number[]
    current_visibility: number
    hourly_visibility: number[]
}

export interface WeatherMap {
    [index: string]: Weather
}

export interface Page {
    temp: {
        temp: string
        image: string
    }
    city: string
    quantity: string
    rate: string
    amount: string
    rich: boolean
    hidden: boolean
}

export interface WeatherAll {
    weather: WeatherMap
    page: Page
}

const initialState: WeatherAll = {
    weather: {},
    page: {
        temp: {
            temp: '0',
            image: 'wb_sunny'
        },
        quantity: '1',
        rich: true,
        city: 'Moscow',
        rate: '0 %',
        amount: '0 USD',
        hidden: true
    }
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
