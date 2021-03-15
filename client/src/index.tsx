import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Helmet } from 'react-helmet'

import * as serviceWorker from './serviceWorker'

import './index.css'
import App from './App'
import {store} from './app/store'
import {Provider} from 'react-redux'
import {NavLink} from "react-router-dom";

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
})

let base = ''
if (process.env.NODE_ENV !== 'development') {
    console.log('NODE_ENV')
    const pathname = /\/[a-zA-Z0-9_]*/.exec(window.location.pathname)
    if (pathname) {
        base = pathname[0]
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Helmet>
            <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'/>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
            <title>Forecast trading emulator</title>
            <base href={base + '/'}/>
        </Helmet>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
