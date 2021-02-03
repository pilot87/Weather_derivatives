import {update_stat} from './statsSlice'

const axios = require('axios').default

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const upd = (dispatch: any, getState: any) => {
    if (getState().auth.name !== '') {
    axios.create(getState().auth.request_params).post('./derivative/stats')
        .then((res: any) => {
            dispatch(update_stat(res.data.stats))
        })
        .catch((err: any) => console.log(err))
}
}

export const regularUpdateStats = () => async (dispatch: any, getState: any) => {
    while (true) {
        await sleep(10000)
        upd(dispatch, getState)
    }
}

export const updateStats = () => async (dispatch: any, getState: any) => {
    upd(dispatch, getState)
    return Promise.resolve()
}
