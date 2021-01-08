import {update_weather} from './weatherSlice'

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const updateWeather = () => async (dispatch: any, getState: any) => {

    while(true) {
        if(getState().auth.name != '') {
            getState().auth.request.post('/weather/update')
            // getState().auth.request.post('/weather/rate')
                .then((res: any) => {
                    console.log(res.data)
                    dispatch(update_weather(res.data))
                })
                // .catch((err: any) => console.log(err.response.data.message))
        }
        await sleep(10000)
    }
    // return Promise.resolve()
}
