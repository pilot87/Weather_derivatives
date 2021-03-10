import React, {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import {connect, useSelector} from 'react-redux'

import {Navbar} from './components/Navbar'
import {Signature} from './components/Signature'

import {Session, rename, setSession} from './features/auth/authSlice'
import {WeatherAll} from './features/weather/weatherSlice'
import {page_city_change, Stat} from './features/stats/statsSlice'
import { Derivative } from './features/derivative/derivativeSlice'
import {
    changeCity, changeTemp, changeRich, changeQuantity,
    changePrivate_derivative, updRate, regularUpdateRate
} from './features/derivative/useDerivative'
import {regularUpdateBalance, upd_Balance, updateBalance} from './features/auth/useAuth'

import { Login } from './pages/loginPage'
import { AddUser } from './pages/addUser'
import { About } from './pages/aboutUser'
import { WeatherP } from './pages/weather'
import { Forecast } from './pages/forecast'
import { Futures } from './pages/futures'
import {Statistic} from './pages/statistic'
import {regularUpdateWeather, updWeather} from "./features/weather/useWeather";
import {regularUpdateStats, updStats} from "./features/stats/useStats";
import {store} from "./app/store";
import {city_img} from "./components/Images";

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

// class App extends React.Component {
//     async componentDidMount() {
//         const s = this.context.redux.getState()
//         const dispatch = this.context.store.dispatch
//         const get = () => s
//         await updWeather(dispatch, get)
//         await updRate(dispatch, get)
//         await updStats(dispatch, get)
//         await upd_Balance(dispatch, get)
//         store.dispatch(regularUpdateWeather())
//         store.dispatch(regularUpdateRate())
//         store.dispatch(regularUpdateBalance())
//         store.dispatch(regularUpdateStats())
//         city_img.forEach((picture) => {
//             const img = new Image()
//             img.src = picture
//         })
//     }
//     render(): React.ReactNode {
//         return (
//             <Router basename={this.context.redux.getState().state.auth.base}>
//                 <NavbarFrame />
//                 <div className='App'>
//                     <Switch>
//                         <Route exact path='/' component={ FuturesPage } />
//                         <Route exact path='/login' component={ LoginPage } />
//                         <Route exact path='/register' component={ AddUserPage } />
//                         <Route exact path='/about' component={ AboutPage } />
//                         <Route exact path='/weather' component={ WeatherPage } />
//                         <Route path='/forecast/:city' component={ ForecastPage } />
//                         <Route exact path='/statistic' component={ StatisticPage }  />
//                         <Redirect to='/' />
//                     </Switch>
//                 </div>
//                 <Signature />
//             </Router>
//         )
//     }
// }

const initializeData = () => async (dispatch: any, getState: any) => {
    try {
        await updWeather(dispatch, getState)
        await updRate(dispatch, getState)
        await updStats(dispatch, getState)
        await upd_Balance(dispatch, getState)
        store.dispatch(regularUpdateWeather())
        store.dispatch(regularUpdateRate())
        store.dispatch(regularUpdateBalance())
        store.dispatch(regularUpdateStats())
        city_img.forEach((picture) => {
            const img = new Image()
            img.src = picture
        })
    } catch {
        console.log('error')
    }
}

const App = ({loadingState, initializeData}: {loadingState: any, initializeData: any}) => {
    useEffect(() => {initializeData()}, [])

    return (
        <Router basename={useSelector((state: State) => state.auth.base)}>
            <NavbarFrame />
            <div className='App'>
                <Switch>
                    <Route exact path='/' component={ FuturesPage } />
                    <Route exact path='/login' component={ LoginPage } />
                    <Route exact path='/register' component={ AddUserPage } />
                    <Route exact path='/about' component={ AboutPage } />
                    <Route exact path='/weather' component={ WeatherPage } />
                    <Route path='/forecast/:city' component={ ForecastPage } />
                    <Route exact path='/statistic' component={ StatisticPage }  />
                    <Redirect to='/' />
                </Switch>
            </div>
            <Signature />
        </Router>
    )
}

export default connect(
    state => ({loadingState: state}),
    {initializeData}
)(App)
