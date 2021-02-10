import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {base} from '../../index'
export interface Session {
    name: string
    email: string
    request_params: any
    balance: number
    base: string
}

export interface User {
    name: string
    email: string
    token: string
}

let es: User = { name: '', email: '', token: '' }

try {
    es = JSON.parse(document.cookie)
}
catch (e) {
    document.cookie = JSON.stringify(es)
}

const initialState: Session = {
    name: es.name,
    email: es.email,
    balance: 0,
    base: base,
    request_params: {
        // @ts-ignore
        baseURL: base + '/api',
        timeout: 30000,
        headers: { 'Content-Type': 'application/json', 'Authorization': es.token }
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSession(state, action: PayloadAction<User>) {
            const { name, email, token } = action.payload
            const es = { name: name, email: email, token: 'Bearer ' + token }
            document.cookie = JSON.stringify(es)
            state.name = name
            state.email = email
            state.request_params = {
                baseURL: "/wf/api",
                timeout: 30000,
                headers: { 'Content-Type': 'application/json', 'Authorization': es.token }
            }
        },
        rename(state, action: PayloadAction<string>) {
            const es = JSON.parse(document.cookie)
            es.name = action.payload
            document.cookie = JSON.stringify(es)
            state.name = action.payload
        },
        updBalance(state, action: PayloadAction<{ balance: number }>) {
            const {balance} = action.payload
            state.balance = balance
        }
    }
})

export const { setSession, rename, updBalance } = authSlice.actions

export default authSlice.reducer
