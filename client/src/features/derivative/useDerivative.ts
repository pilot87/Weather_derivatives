import {update_rate} from './derivativeSlice'

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const updateRate = () => async (dispatch: any, getState: any) => {

    while(true) {
        if(getState().auth.name != '') {
            Object.keys(getState().weather.weather).map(city =>
                getState().auth.request.post('/derivative/daily_index_info',
                    {
                        city: city,
                        rich: true,
                        l: 2,
                        init_step: 2
                    })
                    .then((res: any) => {
                        console.log('Try')
                        dispatch(update_rate({city: res.data.city, rate: res.data.rate, rate2: res.data.rate2, temp: res.data.temp}))

                    })
                    .catch((err: any) => console.log(err))
            )
        }
        await sleep(10000)
    }
    // return Promise.resolve()
}
