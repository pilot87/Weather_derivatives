import {update_weather} from './weatherSlice'
import {updateRate} from '../derivative/useDerivative'

const axios = require('axios').default

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const upd = (dispatch: any, getState: any) => {
    axios.create(getState().auth.request_params).post('/weather/update')
        .then((res: any) => {
            dispatch(update_weather(res.data))
            if (getState().derivative.page.city === '') {
                updateRate(dispatch, getState)
            }
        })
}

export const regularUpdateWeather = () => async (dispatch: any, getState: any) => {
    while(true) {
        await sleep(10000)
        upd(dispatch, getState)
    }
}

export const updateWeather = () => async (dispatch: any, getState: any) => {
    console.log('updateWeather 0')
    upd(dispatch, getState)
    console.log('updateWeather 1')
}
