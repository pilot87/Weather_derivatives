import React from 'react'
import {useSelector} from 'react-redux'
import {Weather, WeatherAll} from '../features/weather/weatherSlice'

import {city_img} from '../components/Images'

interface State {
    weather: WeatherAll
}

export const WeatherPage = () => {

    let cities: any = useSelector((state: State) =>
        Object.entries(state.weather.weather).map((city: [string, Weather], index: number) =>
            <td onClick={() => window.location.replace('/forecast/' + city[0])}
                style={{cursor: 'pointer'}}>
                    <div className="card">
                        <div className="card-image">
                            <img src={city_img[index]} alt={city[0]} style={{maxWidth: '100%', height: 'auto'}}/>
                            <span className="card-title">{city[0]}</span>
                        </div>
                        <div className="card-content">
                            <table>
                                <tbody>
                                <tr>
                                    <td>Temperature</td>
                                    <td style={{textAlign: 'right'}}>{Math.round((city[1].current_temp + Number.EPSILON) * 100) / 100 + ' °С'}</td>
                                </tr>
                                <tr>
                                    <td>Wind speed</td>
                                    <td style={{textAlign: 'right'}}>{city[1].current_wind_speed + ' meter/sec'}</td>
                                </tr>
                                <tr>
                                    <td>Cloudiness</td>
                                    <td style={{textAlign: 'right'}}>{city[1].current_clouds + ' %'}</td>
                                </tr>
                                <tr>
                                    <td>Pressure</td>
                                    <td style={{textAlign: 'right'}}>{city[1].current_pressure + ' hPa'}</td>
                                </tr>
                                <tr>
                                    <td>Humidity</td>
                                    <td style={{textAlign: 'right'}}>{city[1].current_humidity + ' %'}</td>
                                </tr>
                                <tr>
                                    <td>Visibility</td>
                                    <td style={{textAlign: 'right'}}>{city[1].current_visibility + ' metres'}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

            </td>
        ))
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
                        <a className="breadcrumb">Weather</a>
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