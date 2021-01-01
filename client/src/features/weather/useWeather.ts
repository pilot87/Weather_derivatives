import {update} from './weatherSlice'
import {useDispatch, useSelector} from 'react-redux'
import {Session} from '../auth/authSlice'
import {useCallback} from 'react'

interface State {
    auth: Session
}

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const updateWeather = () => async (dispatch: any, getState: any) => {

    while(true) {
        if(getState().auth.name != '') {
            getState().auth.request.post('/weather/update')
                .then((res: any) => {
                    dispatch(update(res.data))
                })
                .catch((err: any) => console.log(err.response.data.message))
        }
        await sleep(10000)
    }
    // return Promise.resolve()
}
