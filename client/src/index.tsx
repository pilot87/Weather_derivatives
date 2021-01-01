import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import {updateWeather} from './features/weather/useWeather'
import {useDispatch} from 'react-redux'

const headRoot = document.head
class Head extends React.Component {
    public render() {
        return ReactDOM.createPortal(this.props.children, headRoot)
    }
}

ReactDOM.render(
  <React.StrictMode>
      <Head>
          <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
          <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
          <title>My Page</title>
      </Head>
      <Provider store={store}>
          <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
