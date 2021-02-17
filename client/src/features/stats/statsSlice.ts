import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {city_img} from '../../components/Images'

export interface StatDetail {
    paid: string
    completed: boolean
    quantity: 1
    user: string
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

export interface PageStat {
    index: number
    active: string[]
}

export interface Stat {
    city: CurrentStat
    page: PageStat[]
}

const initialState: Stat = {
    city: {},
    page: (new Array(city_img.length)).fill({index: 0, active: ['green lighten-4', '', '']})
}

export const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {
        update_stat(state: Stat, action: PayloadAction<CurrentStat>) {
            for (const [key, value] of Object.entries(action.payload)) {
                state.city[key] = value
            }
        },
        page_city_push(state: Stat, action: PayloadAction<PageStat>) {
            state.page.push(action.payload)
        },
        page_city_change(state: Stat, action: PayloadAction<{index: number, payload: PageStat}>) {
            state.page[action.payload.index] = action.payload.payload
        }
    }
})

export const { update_stat, page_city_push, page_city_change } = statsSlice.actions

export default statsSlice.reducer
