import React from 'react'

import {Weather, WeatherAll} from '../features/weather/weatherSlice'
import {Derivative} from '../features/derivative/derivativeSlice'
import {Session} from '../features/auth/authSlice'
import {city_img} from '../components/Images'
import {store} from '../app/store'
import {updateBalance} from '../features/auth/useAuth'
import {rate} from '../features/derivative/useDerivative'

const axios = require('axios').default

interface Args {
    auth: Session
    weather0: WeatherAll
    derivative0: Derivative
    setCity: any
    setTemp: any
    setRich: any
    setTempRate: any
    setQuantity: any
    setPrivate_derivative: any
}

export const Futures = ({
                            auth,
                            weather0,
                            derivative0,
                            setCity,
                            setTemp,
                            setRich,
                            setTempRate,
                            setQuantity,
                            setPrivate_derivative
}: Args): any => {

    const city = derivative0.page.city
    const temp = derivative0.page.temp
    const rich = derivative0.page.rich

    const request = axios.create(auth.request_params)
    const derivative = derivative0.daily[city]


    const tempRate = derivative0.page.tempRate

    const private_derivative = derivative0.page.private_derivative
    const quantity = derivative0.page.quantity

    let cities: any = <div className="progress">
        <div className="indeterminate"/>
    </div>

    if(weather0.weather !== undefined) {
        cities = Object.entries(weather0.weather).map((city: [string, Weather], index: number) => {
            return (
                <td onClick={() => {
                    setCity(city[0])
                    askRate(temp.temp, rich)
                }}
                    style={{cursor: 'pointer'}}>
                    <div className="card">
                        <div className="card-image">
                            <img src={city_img[index]} alt={city[0]} style={{maxWidth: '100%', height: 'auto'}}/>
                            <span className="card-title">{city[0]}</span>
                        </div>
                    </div>
                </td>
            )
        })
    }

    let rates: any = <div className="progress">
        <div className="indeterminate"/>
    </div>

    if (derivative !== undefined) {
        rates = derivative.temp.map((d: number, i: number) =>
            <tr>
                <td>{Math.round((d + Number.EPSILON) * 100) / 100 + ' °C'}</td>
                <td style={{textAlign: 'center'}}>{Math.round((derivative.rate[i] + Number.EPSILON) * 1000) / 10 + ' %' }</td>
                <td style={{textAlign: 'right'}}>{Math.round((derivative.rate2[i] + Number.EPSILON) * 1000) / 10 + ' %' }</td>
            </tr>
        )
    }

    const askRate = (t?: string, over?: boolean) => {
        let verible: number
        if (t) {
            verible = Number.parseFloat(t)
        } else {
            verible = Number.parseFloat(temp.temp)
        }
        let over_ver: boolean
        if (over) {
            over_ver = over
        } else {
            over_ver = rich
        }
        const lvl = rate(derivative.standard_deviation, derivative.expected_value,
            verible, over_ver)
        setTempRate(Math.round((lvl + Number.EPSILON) * 10000) / 100 + ' %')
    }

    const changeTempHandler = async (event: any) => {

        if (/^(-?[0-9]*\.?[0-9]*)$/.test(event.target.value)) {
            if (Number.parseFloat(event.target.value).toString() === 'NaN') {
                if (event.target.value === '-') {
                    setTemp({temp: '-0', image: 'ac_unit'})
                    askRate('-0', rich)
                } else if (event.target.value === '.') {
                    setTemp({temp: '0.', image: 'wb_sunny'})
                    askRate('0.', rich)
                } else if (event.target.value === '') {
                    setTemp({temp: '0', image: 'wb_sunny'})
                    askRate('0', rich)
                } else {
                    setTemp({temp: event.target.value, image: 'border_color'})
                    setTempRate('')
                }
            } else {
                console.log(event.target.value)
                if (Number.parseFloat(event.target.value) < 0) {
                    setTemp({temp: event.target.value, image: 'ac_unit'})
                    console.log('changeTempHandler')
                    askRate(event.target.value, rich)
                } else {
                    setTemp({temp: event.target.value, image: 'wb_sunny'})
                    console.log('changeTempHandler')
                    askRate(event.target.value, rich)
                }
            }
        }
    }

    const changeQuantityHandler = (event: any) => {
        if (/^[1-9][0-9]*$/.test(event.target.value)) {
            setQuantity(event.target.value)
        }
    }

    let card: any

    const balance = auth.balance

    const handleBuy = () => {
        request.post('/derivative/buy', {
            city: city,
            duration: 60 * 24,
            temp: Number.parseFloat(temp.temp),
            rich: rich,
            quantity: Number.parseFloat(quantity),
            hidden: private_derivative
        })
            .then(() => {
                store.dispatch(updateBalance())
            })
    }

    if(weather0.weather[city] !== undefined) {
        card = <>
            <h4 className="grey-text text-darken-3">
                {city}
            </h4>
            <div className="row">
                <div className="col s3">
                    <table>
                        <tbody>
                        <tr>
                            <td>Temperature</td>
                            <td style={{textAlign: 'right'}}>{Math.round((weather0.weather[city].current_temp + Number.EPSILON) * 100) / 100 + ' °C'}</td>
                        </tr>
                        <tr>
                            <td>Wind speed</td>
                            <td style={{textAlign: 'right'}}>{weather0.weather[city].current_wind_speed + ' meter/sec'}</td>
                        </tr>
                        <tr>
                            <td>Cloudiness</td>
                            <td style={{textAlign: 'right'}}>{weather0.weather[city].current_clouds + ' %'}</td>
                        </tr>
                        <tr>
                            <td>Pressure</td>
                            <td style={{textAlign: 'right'}}>{weather0.weather[city].current_pressure + ' hPa'}</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td style={{textAlign: 'right'}}>{weather0.weather[city].current_humidity + ' %'}</td>
                        </tr>
                        <tr>
                            <td>Visibility</td>
                            <td style={{textAlign: 'right'}}>{weather0.weather[city].current_visibility + ' metres'}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col s3">
                    <table>
                        <thead>
                        <tr>
                            <th>Temperature</th>
                            <th style={{textAlign: 'center'}}>Reach rate</th>
                            <th style={{textAlign: 'right'}}>Not reach rate</th>
                        </tr>
                        </thead>
                        <tbody>
                            {rates}
                        </tbody>
                    </table>
                </div>
                <div className="col s3">
                    <div className='row'>
                        <div className='input-field col s12'>
                            <i className='material-icons prefix'>{temp.image}</i>
                            <input
                                id='temp'
                                name='temp'
                                type='text'
                                value={temp.temp}
                                onChange={changeTempHandler}
                                onFocus={event => event.target.select()}
                            />
                            <label htmlFor='temp' className='active grey-text text-darken-3' style={{fontSize: '160%'}}>Temperature [°C]</label>
                        </div>

                    </div>
                    <div className='row'>
                        <div className='input-field col s12'>
                            <i className='material-icons prefix'>border_color</i>
                            <input
                                id='quantity'
                                name='quantity'
                                type='text'
                                value={quantity}
                                onChange={changeQuantityHandler}
                                onFocus={event => event.target.select()}
                            />
                            <label htmlFor='quantity' className='active grey-text text-darken-3' style={{fontSize: '160%'}}>Quantity</label>
                            <label style={{marginTop: '70px'}}>
                                <input type="checkbox" className="filled-in" checked={rich}
                                    onChange={ () => {
                                        setRich(!rich)
                                        askRate(temp.temp, rich)
                                        console.log('Rich')
                                    }}/>
                                <span className="grey-text text-darken-3">Pay if temperature rises above</span>
                            </label>
                        </div>
                    </div>
                    <div className="collection" style={{marginTop: '70px'}}>
                        <p className="collection-item grey lighten-3 grey-text text-darken-3"><span className="badge">
                            {Math.round((balance + Number.EPSILON) * 100) / 100 + ' USD'}
                        </span>Balance</p>
                    </div>
                </div>
                <div className="col s3">
                    <div className="collection">
                        <p className="collection-item grey lighten-3 grey-text text-darken-3"><span className="badge">
                            {tempRate}
                        </span>Rate</p>
                    </div>
                    <div className="collection" style={{marginTop: '70px'}}>
                        <p className="collection-item grey lighten-3 grey-text text-darken-3"><span className="badge">
                            {Math.round(Number.parseFloat(tempRate) * Number.parseFloat(quantity)) * 60 * 24 / 100 + ' USD'}
                        </span>Amount</p>
                    </div>
                    <div style={{marginTop: '38px'}}>
                        <label>
                            <input type="checkbox" className="filled-in" checked={private_derivative}
                                   onChange={() => setPrivate_derivative(!private_derivative)}/>
                            <span className="grey-text text-darken-3">Private (only you will see one)</span>
                        </label>
                    </div>
                    <div className="waves-effect waves-light btn" style={{marginTop: '33px'}}
                    onClick={handleBuy}>
                        Buy
                    </div>
                </div>

            </div>
        </>
    } else {
        card = <>
            <h4 className="grey-text text-darken-3">
                {city}
            </h4>
            <div className="progress">
                <div className="indeterminate"/>
            </div>
        </>
    }

    return <div className="grey lighten-3">
        <nav>
            <div className="nav-wrapper">
                <div className="col s12">
                    <a href="/" className="breadcrumb">Home</a>
                    <a href="/futures" className="breadcrumb">Futures</a>
                </div>
            </div>
        </nav>
        <table>
            <tr>
                {cities}
            </tr>
        </table>
        {card}
    </div>
}
