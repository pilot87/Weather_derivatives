import {update_weather} from './weatherSlice'

const axios = require('axios').default

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const updWeather = async (dispatch: any, getState: any) => {
    return axios.create(getState().auth.request_params).post('/weather/update')
        .then((res: any) => {
            dispatch(update_weather(res.data))
        })
}

export const regularUpdateWeather = () => async (dispatch: any, getState: any) => {
    while(true) {
        await sleep(10000)
        await updWeather(dispatch, getState)
    }
}

// export const updateWeather = () => async (dispatch: any, getState: any) => {
//     console.log('updateWeather 0')
//     upd(dispatch, getState)
//     console.log('updateWeather 1')
// }
