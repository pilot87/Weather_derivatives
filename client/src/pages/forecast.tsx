import React from 'react'

import {useParams} from 'react-router-dom'

export const Forecast = ({weather}: any): any => {

    const city = useParams<{city: string}>().city

    let hourly = <div className="progress">
        <div className="indeterminate"/>
    </div>

    if (weather.weather[city] !== undefined) {
        hourly = weather.weather[city].hourly_temp.map((tmp: number, index: number) => {
            return (
                <tr>
                    <td>{index * 3}</td>
                    <td>{weather.weather[city].hourly_temp[index]}</td>
                    <td>{weather.weather[city].hourly_wind_speed[index]}</td>
                    <td>{weather.weather[city].hourly_clouds[index]}</td>
                    <td>{weather.weather[city].hourly_pressure[index]}</td>
                    <td>{weather.weather[city].hourly_humidity[index]}</td>
                    <td>{weather.weather[city].hourly_visibility[index]}</td>
                </tr>
            )
        })
    }

    return (
        <>
            <nav>
                <div className="nav-wrapper">
                    <div className="col s12">
                        <a href="/" className="breadcrumb">Home</a>
                        <a href="/weather" className="breadcrumb">Weather</a>
                        <a href="#" className="breadcrumb">{'Forecast for ' + city}</a>
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
