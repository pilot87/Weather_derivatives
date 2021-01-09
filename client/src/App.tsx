import React, {useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import {useDispatch} from 'react-redux'

import { Navbar } from './components/Navbar'

import {updateWeather} from './features/weather/useWeather'
import {updateRate} from './features/derivative/useDerivative'
import {regularUpdateBalance} from './features/auth/useAuth'

import { Auth } from './pages/loginPage'
import { AddUser } from './pages/addUser'
import { About } from './pages/aboutUser'
import { WeatherPage } from './pages/weather'
import { Forecast } from './pages/forecast'
import { Futures } from './pages/futures'

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {dispatch(updateWeather())})
    useEffect(() => {dispatch(updateRate())})
    useEffect(() => {dispatch(regularUpdateBalance())})

  return (
      <Router>
        <Navbar />
        <div className='App'>
            <Switch>
                <Route
                    exact
                    path='/'
                    render={() => (
                        <>
                            <nav>
                                <div className="nav-wrapper">
                                    <div className="col s12">
                                        <a className="breadcrumb">Home</a>
                                    </div>
                                </div>
                            </nav>
                        </>
                    )}
                />
                <Route exact path='/login' component={Auth} />
                <Route exact path='/register' component={AddUser} />
                <Route exact path='/about' component={About} />
                <Route exact path='/weather' component={WeatherPage} />
                <Route path='/forecast/:city' component={Forecast} />
                <Route exact path='/futures' component={ Futures} />
                <Redirect to='/' />
            </Switch>
        </div>
      </Router>
  )
}

export default App
