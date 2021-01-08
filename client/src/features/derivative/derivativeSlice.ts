import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface DailyRate {
    [index: string]: {
        temp: number[],
        rate: number[],
        rate2: number[],
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
        update_rate(state: Derivative, action: PayloadAction<{ city: string, rate: number[], rate2: number[], temp: number[] }>) {
            if(!(action.payload.city in state.daily)) {
                state.daily[action.payload.city] = {temp: [], rate: [], rate2: []}
            }

            state.daily[action.payload.city] = {temp: action.payload.temp, rate: action.payload.rate, rate2: action.payload.rate2}
        }
    }
})

export const { update_rate } = authSlice.actions

export default authSlice.reducer
