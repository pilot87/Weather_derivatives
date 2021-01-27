import {update_rate, init_page, setCity, setTemp, setTempRate, setRich,
    setQuantity, setPrivate_derivative} from './derivativeSlice'

const axios = require('axios').default

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const normalcdf = (X: number) => {
    const T = 1 / (1 + 0.2316419 * Math.abs(X))
    const D = 0.3989423 * Math.exp(-X * X / 2)
    let Prob = D * T * (0.3193815 + T * (-0.3565638 + T * (1.781478 + T * (-1.821256 + T * 1.330274))))
    if (X > 0) {
        Prob = 1 - Prob
    }
    return Prob
}

const rate =  (standard_deviation: number,
               expected_value: number,
               temp: number,
               rich: boolean) => {

    let Phi: number

    if(standard_deviation === 0) {
        if (temp < expected_value) {
            Phi = 0
        } else {
            Phi = 1
        }
    } else {
        Phi = Math.round(100000 * normalcdf((temp - expected_value) /
            standard_deviation)) / 100000
        if(!rich) {
            Phi = 1 - Phi
        }
    }

    return 1.05 * Phi
}

const upd = (dispatch: any, getState: any, init_city?: string) => {
    console.log('upd')
    if(getState().auth.name !== '') {
        axios.create(getState().auth.request_params).post('/derivative/daily_params')
            .then((res: any) => {
                res.data.stats.forEach((city: any) => {
                    let temp: number[]
                    let di: number[]
                    let step = 2
                    const l = 2

                    do {
                        temp = []
                        di = []

                        for (let t = 0; t < 2 * l + 1; t++) {
                            temp.push(city.expected_value - (l - t) * step)
                        }

                        for (const t of temp) {
                            const i = rate(
                                city.standard_deviation,
                                city.expected_value,
                                t,
                                true)
                            di.push(i)
                        }

                        step = step / 2
                    } while (Math.max(...di) > 1)

                    let di2 = []

                    for (const i of di) {
                        di2.push(1 - i)
                    }

                    dispatch(update_rate({
                        city: city.name,
                        rate: di,
                        rate2: di2,
                        temp: temp,
                        expected_value: city.expected_value,
                        standard_deviation: city.standard_deviation
                    }))
                })
                if (init_city) {
                    console.log(init_city)
                    dispatch(init_page({
                        city: init_city,
                        temp: {
                            temp: '0',
                            image: 'wb_sunny'
                        },
                        quantity: '1',
                        tempRate: Math.round((rate(
                            getState().derivative.daily[init_city].standard_deviation,
                            getState().derivative.daily[init_city].expected_value,
                            0,
                            true
                        ) + Number.EPSILON) * 10000) / 100 + ' %',
                        private_derivative: true,
                        rich: true
                    }))
                }
            })
            .catch((err: any) => console.log(err))
    }
}

export const regularUpdateRate = () => async (dispatch: any, getState: any) => {
    while(true) {
        await sleep(10000)
        upd(dispatch, getState)
    }
}

export const updateRate = (dispatch: any, getState: any) => {
    // await sleep(2000)
    // const weather = getState().weather.weather
    const city = Object.keys(getState().weather.weather)[0]
    console.log('try ' + city)
    upd(dispatch, getState, city)
}

const askRate = (dispatch: any, getState: any) => {
    const city = getState().derivative.page.city
    const lvl = rate(getState().derivative.daily[city].standard_deviation,
        getState().derivative.daily[city].expected_value,
        getState().derivative.page.temp.temp,
        getState().derivative.page.rich)
    console.log(lvl)
    dispatch(setTempRate(Math.round((lvl + Number.EPSILON) * 10000) / 100 + ' %'))
}

export const changeCity = (city: string) => async (dispatch: any, getState: any) => {
    dispatch(setCity(city))
    askRate(dispatch, getState)
}

export const changeTemp = (event: any) => async (dispatch: any, getState: any) => {

    if (/^(-?[0-9]*\.?[0-9]*)$/.test(event.target.value)) {
        if (Number.parseFloat(event.target.value).toString() === 'NaN') {
            if (event.target.value === '-') {
                dispatch(setTemp({temp: '-0', image: 'ac_unit'}))
                askRate(dispatch, getState)
            } else if (event.target.value === '.') {
                dispatch(setTemp({temp: '0.', image: 'wb_sunny'}))
                askRate(dispatch, getState)
            } else if (event.target.value === '') {
                dispatch(setTemp({temp: '0', image: 'wb_sunny'}))
                askRate(dispatch, getState)
            } else {
                dispatch(setTemp({temp: event.target.value, image: 'border_color'}))
                askRate(dispatch, getState)
            }
        } else {
            console.log(event.target.value)
            if (Number.parseFloat(event.target.value) < 0) {
                dispatch(setTemp({temp: event.target.value, image: 'ac_unit'}))
                askRate(dispatch, getState)
            } else {
                dispatch(setTemp({temp: event.target.value, image: 'wb_sunny'}))
                askRate(dispatch, getState)
            }
        }
    }
}

export const changeRich = () => async (dispatch: any, getState: any) => {
    dispatch(setRich(!getState().derivative.page.rich))
    askRate(dispatch, getState)
}

export const changeQuantity = (event: any) => async (dispatch: any, getState: any) => {
    if (/^[1-9][0-9]*$/.test(event.target.value)) {
        dispatch(setQuantity(event.target.value))
    }
    askRate(dispatch, getState)
}

export const changePrivate_derivative = () => async (dispatch: any, getState: any) => {
    dispatch(setPrivate_derivative(!getState().derivative.page.private_derivative))
    askRate(dispatch, getState)
}
