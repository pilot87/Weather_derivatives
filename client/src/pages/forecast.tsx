import {useSelector, useDispatch} from 'react-redux'
import React from 'react'
import {useParams} from 'react-router-dom'
import {Weather, WeatherAll} from '../features/weather/weatherSlice'

interface State {
    weather: WeatherAll
}

export const Forecast = () => {
    const dispatch = useDispatch()

    const city = useParams<{city: string}>().city

    // console.log(city)
    // console.log(useSelector((state: State) => state.weather.weather[city]).hourly_tmp)

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
    const hourly1 = useSelector((state: State) => {
        if (state.weather.weather[city] !== undefined) {
            return state.weather.weather[city].hourly_temp.map((tmp: number, index:number) => {
                return (
                    <a className='collection-item'><span className='badge'>
                    {tmp + ' °C'}</span>
                        {index + ' h'}
                    </a>
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
                        <a className="breadcrumb">{'Forecast for ' + city}</a>
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
