import React from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import {connect, useSelector} from 'react-redux'

import {Navbar} from './components/Navbar'

import {Session, rename, setSession} from './features/auth/authSlice'
import {WeatherAll} from './features/weather/weatherSlice'
import {page_city_change, Stat} from './features/stats/statsSlice'

import { Derivative } from './features/derivative/derivativeSlice'

import {changeCity, changeTemp, changeRich, changeQuantity,
    changePrivate_derivative} from './features/derivative/useDerivative'

import { Login } from './pages/loginPage'
import { AddUser } from './pages/addUser'
import { About } from './pages/aboutUser'
import { WeatherP } from './pages/weather'
import { Forecast } from './pages/forecast'
import { Futures } from './pages/futures'
import {Statistic} from './pages/statistic'
import {updateBalance} from "./features/auth/useAuth";

interface State {
    stats: Stat
    auth: Session
    weather: WeatherAll
    derivative: Derivative
}

const StatisticPage = connect(() => (state: State) => {
    return {stats: state.stats, baseUrl: state.auth.base}
}, {
    page_city_change: page_city_change
})(Statistic)

const NavbarFrame = connect(() => (state: State) => {
    return {auth: state.auth, baseUrl: state.auth.base}
})(Navbar)

const AboutPage = connect(() => (state: State) => {
    return {auth: state.auth, baseUrl: state.auth.base}
}, {
    rename: rename, setSession: setSession, updateBalance: updateBalance
})(About)

const AddUserPage = connect(() => (state: State) => {
    return {auth: state.auth, baseUrl: state.auth.base}
})(AddUser)

const ForecastPage = connect(() => (state: State) => {
    return {weather: state.weather, baseUrl: state.auth.base}
})(Forecast)

const WeatherPage = connect(() => (state: State) => {
    return {weather: state.weather, baseUrl: state.auth.base}
})(WeatherP)

const LoginPage = connect(() => (state: State) => {
    return {auth: state.auth, baseUrl: state.auth.base}
}, {
    setSession: setSession
})(Login)

const FuturesPage = connect(() => (state: State) => {
    return {auth: state.auth, weather0: state.weather, derivative0:
        state.derivative, baseUrl: state.auth.base}
}, {
    changeCity: changeCity,
    changeTemp: changeTemp,
    changeRich: changeRich,
    changeQuantity: changeQuantity,
    changePrivate_derivative: changePrivate_derivative
})(Futures)


const App = () => {

  return (
      <Router basename={useSelector((state: State) => state.auth.base)}>
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
                <Route exact path='/login' component={ LoginPage } />
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
