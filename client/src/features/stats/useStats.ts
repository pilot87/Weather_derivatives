import {update_stat} from './statsSlice'
const axios = require('axios').default

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const updateStats = () => async (dispatch: any, getState: any) => {

    while (true) {
        if (getState().auth.name !== '') {
            axios.create(getState().auth.request_params).post('/derivative/stats')
                .then((res: any) => {
                    dispatch(update_stat(res.data.stats))
                })
                .catch((err: any) => console.log(err))
        }
        await sleep(10000)
    }
}