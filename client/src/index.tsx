import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import * as serviceWorker from './serviceWorker'

import './index.css'
import App from './App'
import {store} from './app/store'
import {Provider} from 'react-redux'
import {city_img} from './components/Images'

import {upd_Balance, regularUpdateBalance} from './features/auth/useAuth'
import {updRate, regularUpdateRate} from './features/derivative/useDerivative'
import {updStats, regularUpdateStats} from './features/stats/useStats'
import {updWeather, regularUpdateWeather} from './features/weather/useWeather'


const headRoot = document.head
class Head extends React.Component {
    public render() {
        return ReactDOM.createPortal(this.props.children, headRoot)
    }
}

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
})

let base = ''
if (process.env.NODE_ENV !== 'development') {
    console.log('NODE_ENV')
    // @ts-ignore
    base = /\/[a-zA-Z0-9_]*/.exec(window.location.pathname)[0]
}

ReactDOM.render(
    <React.StrictMode>
        <Head>
            <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'/>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
            <title>My Page</title>
            <base href={base + '/'}/>
        </Head>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
