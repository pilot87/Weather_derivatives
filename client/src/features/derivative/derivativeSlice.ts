import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface DailyRate {
    [index: string]: {
        temp: number[],
        rate: number[],
        rate2: number[],
        expected_value: number,
        standard_deviation: number
    }
}

interface Page {
    city: string
    temp: {
        temp: string
        image: string
    }
    rich: boolean
    tempRate: string
    quantity: string
    private_derivative: boolean
}

export interface Derivative {
    daily: DailyRate
    page: Page
}

const initialState: Derivative = {
    daily: {},
    page: {
        city: '',
        temp: {
            temp: '0',
            image: 'wb_sunny'
        },
        rich: true,
        tempRate: '0 USD',
        quantity: '1',
        private_derivative: true
    }
}

export const authSlice = createSlice({
    name: 'derivative',
    initialState,
    reducers: {
        init_page(state: Derivative, action: PayloadAction<Page>) {
            state.page = action.payload
        },
        setCity(state: Derivative, action: PayloadAction<string>) {
            state.page.city = action.payload
        },
        setTemp(state: Derivative, action: PayloadAction<{temp: string, image: string}>) {
            state.page.temp = action.payload
        },
        setRich(state: Derivative, action: PayloadAction<boolean>) {
            state.page.rich = action.payload
        },
        setTempRate(state: Derivative, action: PayloadAction<string>) {
            state.page.tempRate = action.payload
        },
        setQuantity(state: Derivative, action: PayloadAction<string>) {
            state.page.quantity = action.payload
        },
        setPrivate_derivative(state: Derivative, action: PayloadAction<boolean>) {
            state.page.private_derivative = action.payload
        },
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

export const {
    update_rate,
    init_page,
    setCity,
    setTemp,
    setRich,
    setTempRate,
    setQuantity,
    setPrivate_derivative
} = authSlice.actions

export default authSlice.reducer
