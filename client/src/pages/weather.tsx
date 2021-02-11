import React from 'react'
import {NavLink} from 'react-router-dom'

import {Weather, WeatherAll} from '../features/weather/weatherSlice'
import {city_img} from '../components/Images'

interface Args {
    weather: WeatherAll
    baseUrl: string
}

let base = ''
if (process.env.NODE_ENV !== 'development') {
    console.log('NODE_ENV')
    // @ts-ignore
    base = /\/[a-zA-Z0-9_]*/.exec(window.location.pathname)[0]
}

export const WeatherP = ({weather, baseUrl}: Args): any => {
    let cities: any =  Object.entries(weather.weather).map((city: [string, Weather], index: number) =>
        <td>
            <NavLink to={'/forecast/' + city[0]}>
                <div className="card">
                    <div className="card-image">
                        <img src={city_img[index]} alt={city[0]} className='weather_img'/>
                        <span className="card-title">{city[0]}</span>
                    </div>
                    <div className="card-content black-text">
                        <table>
                            <tbody>
                            <tr>
                                <td>Temperature</td>
                                <td className='weather_table_right'>
                                    {Math.round((city[1].current_temp + Number.EPSILON) * 100) / 100 + ' °С'}
                                </td>
                            </tr>
                            <tr>
                                <td>Wind speed</td>
                                <td className='weather_table_right'>{city[1].current_wind_speed + ' meter/sec'}</td>
                            </tr>
                            <tr>
                                <td>Cloudiness</td>
                                <td className='weather_table_right'>{city[1].current_clouds + ' %'}</td>
                            </tr>
                            <tr>
                                <td>Pressure</td>
                                <td className='weather_table_right'>{city[1].current_pressure + ' hPa'}</td>
                            </tr>
                            <tr>
                                <td>Humidity</td>
                                <td className='weather_table_right'>{city[1].current_humidity + ' %'}</td>
                            </tr>
                            <tr>
                                <td>Visibility</td>
                                <td className='weather_table_right'>{city[1].current_visibility + ' metres'}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </NavLink>
        </td>
    )
    if(cities === []) {
        cities = <div className="progress">
            <div className="indeterminate"/>
        </div>
    }

    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12">
                        <NavLink to="/" className="breadcrumb">Home</NavLink>
                        <NavLink to="/weather" className="breadcrumb">Weather</NavLink>
                    </div>
                </div>
            </nav>
            <table>
                <tr>
                    {cities}
                </tr>
            </table>
        </>
    )
}
