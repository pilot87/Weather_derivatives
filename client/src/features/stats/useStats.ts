import {update_stat} from './statsSlice'

const axios = require('axios').default

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const upd = (dispatch: any, getState: any) => {
    console.log('useState')
    let api_addr = '/derivative/stats'
    if (getState().auth.name === '') {
        api_addr = '/derivative/pub_stats'
    }
    console.log(api_addr)
    axios.create(getState().auth.request_params).post(api_addr)
        .then((res: any) => {
            dispatch(update_stat(res.data.stats))
        })
        .catch((err: any) => console.log(err))
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
