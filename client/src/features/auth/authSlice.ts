import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {AppThunk, RootState} from "../../app/store"

const axios = require('axios').default

export interface Session {
    name: string,
    email: string,
    request: any
}

export interface User {
    name: string,
    email: string,
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
    request: axios.create({
        baseURL: "/api",
        timeout: 30000,
        headers: { 'Content-Type': 'application/json', 'Authorization': es.token }
    })
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
            state.request = axios.create({
                baseURL: "/api",
                timeout: 30000,
                headers: { 'Content-Type': 'application/json', 'Authorization': es.token }
            })
            // state.request.defaults.headers.common['Authorization'] = 'Bearer ' + token
        },
        rename(state, action: PayloadAction<string>) {
            const es = JSON.parse(document.cookie)
            es.name = action.payload
            document.cookie = JSON.stringify(es)
            state.name = action.payload
        }
    }
})

export const { setSession, rename } = authSlice.actions

export default authSlice.reducer
