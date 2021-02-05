import React from 'react'

import {Weather, WeatherAll} from '../features/weather/weatherSlice'
import {Derivative} from '../features/derivative/derivativeSlice'
import {Session} from '../features/auth/authSlice'
import {city_img} from '../components/Images'
import {store} from '../app/store'
import {updateBalance} from '../features/auth/useAuth'

const axios = require('axios').default

interface Args {
    auth: Session
    weather0: WeatherAll
    derivative0: Derivative
    changeCity: (city: string) => void
    changeTemp: (event: any) => void
    changeRich: () => void
    changeQuantity: (event: any) => void
    changePrivate_derivative: () => void
    baseUrl: string
}

export const Futures = ({
                            auth,
                            weather0,
                            derivative0,
                            changeCity,
                            changeTemp,
                            changeRich,
                            changeQuantity,
                            changePrivate_derivative,
                            baseUrl
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
                    changeCity(city[0])
                }}>
                    <div className="card">
                        <div className="card-image">
                            <img className='futures_img'
                                src={city_img[index]} alt={city[0]}/>
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
                <td className='text_center'>{Math.round((derivative.rate[i] + Number.EPSILON) * 1000) / 10 + ' %' }</td>
                <td className='text_right'>{Math.round((derivative.rate2[i] + Number.EPSILON) * 1000) / 10 + ' %' }</td>
            </tr>
        )
    }

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

    let card: any = <>
        <h4 className="grey-text text-darken-3">
            {city}
        </h4>
        <div className="progress">
            <div className="indeterminate"/>
        </div>
    </>

    if(city !== '') {
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
                            <td className='text_right'>{Math.round((weather0.weather[city].current_temp + Number.EPSILON) * 100) / 100 + ' °C'}</td>
                        </tr>
                        <tr>
                            <td>Wind speed</td>
                            <td className='text_right'>{weather0.weather[city].current_wind_speed + ' meter/sec'}</td>
                        </tr>
                        <tr>
                            <td>Cloudiness</td>
                            <td className='text_right'>{weather0.weather[city].current_clouds + ' %'}</td>
                        </tr>
                        <tr>
                            <td>Pressure</td>
                            <td className='text_right'>{weather0.weather[city].current_pressure + ' hPa'}</td>
                        </tr>
                        <tr>
                            <td>Humidity</td>
                            <td className='text_right'>{weather0.weather[city].current_humidity + ' %'}</td>
                        </tr>
                        <tr>
                            <td>Visibility</td>
                            <td className='text_right'>{weather0.weather[city].current_visibility + ' metres'}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col s3">
                    <table>
                        <thead>
                        <tr>
                            <th>Temperature</th>
                            <th className='text_center'>Reach rate</th>
                            <th className='text_right'>Not reach rate</th>
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
                                onChange={async (event: any) => {
                                    changeTemp(event)
                                }}
                                onFocus={event => event.target.select()}
                            />
                            <label htmlFor='temp' className='active label_temperature grey-text text-darken-3'>
                                Temperature [°C]
                            </label>
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
                                onChange={(event: any) => {
                                    changeQuantity(event)
                                }}
                                onFocus={event => event.target.select()}
                            />
                            <label htmlFor='quantity' className='active label_quantity grey-text text-darken-3'>
                                Quantity
                            </label>
                            <label className='label_rich'>
                                <input type="checkbox" className="filled-in" checked={rich}
                                    onChange={ () => {
                                        changeRich()
                                    }}/>
                                <span className="grey-text text-darken-3">Pay if temperature rises above</span>
                            </label>
                        </div>
                    </div>
                    <div className="collection label_rich">
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
                    <div className="collection label_rich">
                        <p className="collection-item grey lighten-3 grey-text text-darken-3"><span className="badge">
                            {Math.round(Number.parseFloat(tempRate) * Number.parseFloat(quantity)) * 60 * 24 / 100 + ' USD'}
                        </span>Amount</p>
                    </div>
                    <div className='cont_private_label'>
                        <label>
                            <input type="checkbox" className="filled-in" checked={private_derivative}
                                   onChange={() => {
                                       changePrivate_derivative()
                                   }}/>
                            <span className="grey-text text-darken-3">Private (only you will see one)</span>
                        </label>
                    </div>
                    <div className="buy_btn btn"
                    onClick={handleBuy}>
                        Buy
                    </div>
                </div>

            </div>
        </>
    }

    return <div className="grey lighten-3">
        <nav>
            <div className="nav-wrapper">
                <div className="col s12">
                    <a href="" className="breadcrumb">Home</a>
                    <a href="futures" className="breadcrumb">Futures</a>
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
