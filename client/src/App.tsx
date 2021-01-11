import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import { Navbar } from './components/Navbar'

import {updateWeather} from './features/weather/useWeather'
import {updateRate} from './features/derivative/useDerivative'
import {regularUpdateBalance} from './features/auth/useAuth'
import {updateStats} from './features/stats/useStats'

import { Auth } from './pages/loginPage'
import { AddUser } from './pages/addUser'
import { About } from './pages/aboutUser'
import { WeatherPage } from './pages/weather'
import { Forecast } from './pages/forecast'
import { Futures } from './pages/futures'
import { Statistic } from './pages/statistic'

import {store} from './app/store'

const App = () => {

    // const dispatch = useDispatch()

    // useEffect(() => {dispatch(updateWeather())})
    // useEffect(() => {dispatch(updateRate())})
    // useEffect(() => {dispatch(regularUpdateBalance())})
    store.dispatch(updateWeather())
    store.dispatch(updateRate())
    store.dispatch(regularUpdateBalance())
    store.dispatch(updateStats())


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
                                        <p className="breadcrumb">Home</p>
                                    </div>
                                </div>
                            </nav>
                        </>
                    )}
                />
                <Route exact path='/login' component={ Auth } />
                <Route exact path='/register' component={ AddUser } />
                <Route exact path='/about' component={ About } />
                <Route exact path='/weather' component={ WeatherPage } />
                <Route path='/forecast/:city' component={ Forecast } />
                <Route exact path='/futures' component={ Futures } />
                <Route exact path='/statistic' component={ Statistic } />
                <Redirect to='/' />
            </Switch>
        </div>
      </Router>
  )
}

export default App
