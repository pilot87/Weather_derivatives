import {updBalance} from './authSlice'

const axios = require('axios').default

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const upd = (dispatch: any, getState: any) => {
    if(getState().auth.name !== '') {
        axios.create(getState().auth.request_params).post('/profile/balance')
            .then((res: any) => {
                dispatch(updBalance(res.data))
            })
    }
}

export const regularUpdateBalance = () => async (dispatch: any, getState: any) => {
    while(true) {
        await sleep(10000)
        upd(dispatch, getState)
    }
}

export const updateBalance = () => async (dispatch: any, getState: any) => {
    upd(dispatch, getState)
    return Promise.resolve()
}
