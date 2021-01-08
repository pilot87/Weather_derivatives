import {updBalance} from './authSlice'

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const regularUpdateBalance = () => async (dispatch: any, getState: any) => {

    while(true) {
        if(getState().auth.name != '') {
            getState().auth.request.post('/profile/balance')
                // getState().auth.request.post('/weather/rate')
                .then((res: any) => {
                    console.log(res.data)
                    dispatch(updBalance(res.data))
                })
            // .catch((err: any) => console.log(err.response.data.message))
        }
        await sleep(10000)
    }
    // return Promise.resolve()
}

export const updateBalance = () => async (dispatch: any, getState: any) => {

    getState().auth.request.post('/profile/balance')
        // getState().auth.request.post('/weather/rate')
        .then((res: any) => {
            console.log(res.data)
            dispatch(updBalance(res.data))
        })
            // .catch((err: any) => console.log(err.response.data.message))

    // return Promise.resolve()
}
