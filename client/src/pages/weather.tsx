import React from 'react'

import {Weather, WeatherAll} from '../features/weather/weatherSlice'
import {city_img} from '../components/Images'

interface Args {
    weather: WeatherAll
}

export const WeatherP = ({weather}: Args): any => {
    let cities: any =  Object.entries(weather.weather).map((city: [string, Weather], index: number) =>
        <td onClick={() => window.location.replace('/forecast/' + city[0])}>
                <div className="card">
                    <div className="card-image">
                        <img src={city_img[index]} alt={city[0]} className='weather_img'/>
                        <span className="card-title">{city[0]}</span>
                    </div>
                    <div className="card-content">
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
                        <a href="/" className="breadcrumb">Home</a>
                        <a href="/weather" className="breadcrumb">Weather</a>
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