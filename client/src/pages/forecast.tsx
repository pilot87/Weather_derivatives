import {useSelector} from 'react-redux'
import React from 'react'
import {useParams} from 'react-router-dom'
import {WeatherAll} from '../features/weather/weatherSlice'

interface State {
    weather: WeatherAll
}

export const Forecast = () => {

    const city = useParams<{city: string}>().city

    const hourly = useSelector((state: State) => {
        if (state.weather.weather[city] !== undefined) {
            return state.weather.weather[city].hourly_temp.map((tmp: number, index:number) => {
                return (
                    <tr>
                        <td>{index * 3}</td>
                        <td>{state.weather.weather[city].hourly_temp[index]}</td>
                        <td>{state.weather.weather[city].hourly_wind_speed[index]}</td>
                        <td>{state.weather.weather[city].hourly_clouds[index]}</td>
                        <td>{state.weather.weather[city].hourly_pressure[index]}</td>
                        <td>{state.weather.weather[city].hourly_humidity[index]}</td>
                        <td>{state.weather.weather[city].hourly_visibility[index]}</td>
                    </tr>
                )
            })
        }
        return <div className="progress">
            <div className="indeterminate"/>
        </div>
    })

    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12">
                        <a href="/" className="breadcrumb">Home</a>
                        <a href="/weather" className="breadcrumb">Weather</a>
                        <p className="breadcrumb">{'Forecast for ' + city}</p>
                    </div>
                </div>
            </nav>
            <table>
                <thead>
                <tr>
                    <th>Hours</th>
                    <th>Temperature</th>
                    <th>Wind speed</th>
                    <th>Cloudiness</th>
                    <th>Pressure</th>
                    <th>Humidity</th>
                    <th>Visibility</th>
                </tr>
                </thead>

                <tbody>
                    {hourly}
                </tbody>
            </table>
        </>
    )

}
