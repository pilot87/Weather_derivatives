import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Weather, WeatherAll} from '../features/weather/weatherSlice'

export const Futures = () => {
    return <>
        <nav>
            <div className="nav-wrapper">
                <div className="col s12">
                    <a href="/" className="breadcrumb">Home</a>
                    <a className="breadcrumb">Futures</a>
                </div>
            </div>
        </nav>
    </>
}