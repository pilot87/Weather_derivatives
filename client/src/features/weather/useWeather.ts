import {update_weather} from './weatherSlice'
const axios = require('axios').default

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const upd = (dispatch: any, getState: any) => {
    if (getState().auth.name !== '') {
        axios.create(getState().auth.request_params).post('/weather/update')
            .then((res: any) => {
                dispatch(update_weather(res.data))
            })
    }
}

export const regularUpdateWeather = () => async (dispatch: any, getState: any) => {
    while(true) {
        await sleep(10000)
        upd(dispatch, getState)
    }
}

export const updateWeather = () => async (dispatch: any, getState: any) => {
    upd(dispatch, getState)
    return Promise.resolve()
}
