import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/AppMain/AppMain.jsx'
import './styles/body.scss'
import store from '../src/store/Store'
import { Provider } from 'react-redux'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
)
