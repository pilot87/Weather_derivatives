import {updBalance} from './authSlice'

const axios = require('axios').default

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const upd_Balance = async (dispatch: any, getState: any) => {
    if(getState().auth.name !== '') {
        return axios.create(getState().auth.request_params).post('/profile/balance')
            .then((res: any) => {
                dispatch(updBalance(res.data))
            })
    } else {
        return -1
    }
}

export const regularUpdateBalance = () => async (dispatch: any, getState: any) => {
    while(true) {
        await sleep(10000)
        upd_Balance(dispatch, getState)
    }
}

export const updateBalance = () => async (dispatch: any, getState: any) => {
    return upd_Balance(dispatch, getState)
}
