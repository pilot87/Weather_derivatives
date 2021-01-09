import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DailyRate {
    [index: string]: {
        temp: number[],
        rate: number[],
        rate2: number[],
        expected_value: number,
        standard_deviation: number
    }
}

export interface Derivative {
    daily: DailyRate
}

const initialState: Derivative = {
    daily: {}
}

export const authSlice = createSlice({
    name: 'derivative',
    initialState,
    reducers: {
        update_rate(state: Derivative, action: PayloadAction<{
            city: string,
            rate: number[],
            rate2: number[],
            temp: number[],
            expected_value: number,
            standard_deviation: number
        }>) {
            if(!(action.payload.city in state.daily)) {
                state.daily[action.payload.city] = {temp: [], rate: [], rate2: [],
                expected_value: 0, standard_deviation: 0}
            }

            state.daily[action.payload.city] = {
                temp: action.payload.temp,
                rate: action.payload.rate,
                rate2: action.payload.rate2,
                standard_deviation: action.payload.standard_deviation,
                expected_value: action.payload.expected_value
            }
        }
    }
})

export const { update_rate } = authSlice.actions

export default authSlice.reducer
