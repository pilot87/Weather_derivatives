import {update_rate} from './derivativeSlice'

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

export const rate =  (standard_deviation: number,
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
        if(rich) {
            Phi = 1 - Phi
        }
    }

    return 1.05 * Phi
}

export const updateRate = () => async (dispatch: any, getState: any) => {

    while(true) {
        if(getState().auth.name !== '') {
            getState().auth.request.post('/derivative/daily_params')
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
                        } while (Math.max(... di) > 1)

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

                })
                .catch((err: any) => console.log(err))
        }
        await sleep(10000)
    }
}
