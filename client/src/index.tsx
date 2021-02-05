import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'

import './index.css'
import App from './App'
import {store} from './app/store'
import {Provider, useSelector} from 'react-redux'
import * as serviceWorker from './serviceWorker'

import {updateBalance, regularUpdateBalance} from './features/auth/useAuth'
import {regularUpdateRate} from './features/derivative/useDerivative'
import {updateStats, regularUpdateStats} from './features/stats/useStats'
import {updateWeather, regularUpdateWeather} from './features/weather/useWeather'

const headRoot = document.head
class Head extends React.Component {
    public render() {
        return ReactDOM.createPortal(this.props.children, headRoot)
    }
}

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
})

store.dispatch(updateWeather())
    .then(() => {
        return store.dispatch(updateStats())
    })
    .then(() => {
        return store.dispatch(updateBalance())
    })
    .then(() => {
        store.dispatch(regularUpdateWeather())
        store.dispatch(regularUpdateRate())
        store.dispatch(regularUpdateBalance())
        store.dispatch(regularUpdateStats())

        let base = ''
        if (process.env.PUBLIC_URL) {
            // @ts-ignore
            base = /\/[a-zA-Z0-9_]*/.exec(window.location.pathname)[0]
        }

        ReactDOM.render(
            <React.StrictMode>
                <Head>
                    <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
                    <title>My Page</title>
                    <base href={base + '/'} />
                </Head>
                <Provider store={store}>
                    <App />
                </Provider>
            </React.StrictMode>,
            document.getElementById('root')
        )
        serviceWorker.unregister()
    })
    .catch((err: any) => {
        console.log(err)
    })
