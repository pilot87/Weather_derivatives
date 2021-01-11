import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface StatDetail {
    completed: boolean
    quantity: 1
    email: string //change to email up to down and delete collection in mongodb
    duration: number
    duration_left: number
    city: string
    type: string
    hidden: boolean
    temp: number
    temp_reach: boolean
    _id: any
    __v: number
}

export interface CurrentStat {
    [index: string]: StatDetail[]
}

export interface Stat {
    city: CurrentStat
}

const initialState: Stat = {
    city: {}
}

export const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        update_stat(state: Stat, action: PayloadAction<CurrentStat>) {
            for (const [key, value] of Object.entries(action.payload)) {
                state.city[key] = value
            }
            // state.current[Object.keys(action)[0]] = Object.values(action)[0]
        }
    }
})

export const { update_stat } = statsSlice.actions

export default statsSlice.reducer
