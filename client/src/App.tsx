import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { Navbar } from './components/Navbar'

import {Session, rename, setSession} from './features/auth/authSlice'
import {WeatherAll} from './features/weather/weatherSlice'
import {page_city_change, Stat} from './features/stats/statsSlice'

import {
    Derivative,
    setCity,
    setTemp,
    setRich,
    setTempRate,
    setQuantity,
    setPrivate_derivative
} from './features/derivative/derivativeSlice'

import { Auth } from './pages/loginPage'
import { AddUser } from './pages/addUser'
import { About } from './pages/aboutUser'
import { WeatherP } from './pages/weather'
import { Forecast } from './pages/forecast'
import { Futures } from './pages/futures'
import {Statistic} from './pages/statistic'

interface State {
    stats: Stat
    auth: Session
    weather: WeatherAll
    derivative: Derivative
}

const StatisticPage = connect(() => (state: State) => {
    return {stats: state.stats}
}, {
    page_city_change: page_city_change
})(Statistic)

const NavbarFrame = connect(() => (state: State) => {
    return {auth: state.auth}
})(Navbar)

const AboutPage = connect(() => (state: State) => {
    return {auth: state.auth}
}, {
    rename: rename, setSession: setSession
})(About)

const AddUserPage = connect(() => (state: State) => {
    return {auth: state.auth}
})(AddUser)

const ForecastPage = connect(() => (state: State) => {
    return {weather: state.weather}
})(Forecast)

const WeatherPage = connect(() => (state: State) => {
    return {weather: state.weather}
})(WeatherP)

const AuthPage = connect(() => (state: State) => {
    return {auth: state.auth}
})(Auth)

const FuturesPage = connect(() => (state: State) => {
    return {auth: state.auth, weather0: state.weather, derivative0: state.derivative}
}, {
    setCity: setCity,
    setTemp: setTemp,
    setRich: setRich,
    setTempRate: setTempRate,
    setQuantity: setQuantity,
    setPrivate_derivative: setPrivate_derivative
})(Futures)


const App = () => {

    // store.dispatch(updateRate())
    // store.dispatch(regularUpdateBalance())
    // store.dispatch(updateStats())
    // store.dispatch(updateWeather())

  return (
      <Router>
        <NavbarFrame />
        <div className='App'>
            <Switch>
                <Route
                    exact
                    path='/'
                    render={() => (
                        <nav>
                            <div className="nav-wrapper">
                                <div className="col s12">
                                    <p className="breadcrumb">Home</p>
                                </div>
                            </div>
                        </nav>
                    )}
                />
                <Route exact path='/login' component={ AuthPage } />
                <Route exact path='/register' component={ AddUserPage } />
                <Route exact path='/about' component={ AboutPage } />
                <Route exact path='/weather' component={ WeatherPage } />
                <Route path='/forecast/:city' component={ ForecastPage } />
                <Route exact path='/futures' component={ FuturesPage } />
                <Route exact path='/statistic' component={ StatisticPage }  />
                <Redirect to='/' />
            </Switch>
        </div>
      </Router>
  )
}

export default App
