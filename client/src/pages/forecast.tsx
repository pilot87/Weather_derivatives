import React from 'react'
import {useParams} from 'react-router-dom'
import {NavLink} from 'react-router-dom'

let base = ''
if (process.env.NODE_ENV !== 'development') {
    console.log('NODE_ENV')
    // @ts-ignore
    base = /\/[a-zA-Z0-9_]*/.exec(window.location.pathname)[0]
}

export const Forecast = ({weather, baseUrl}: any): any => {

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
                        <NavLink to="/" className="breadcrumb">Home</NavLink>
                        <NavLink to="/weather" className="breadcrumb">Weather</NavLink>
                        <NavLink to={"/weather/" + city} className="breadcrumb">{'Forecast for ' + city}</NavLink>
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
