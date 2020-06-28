import React from 'react'
import * as ReactDOM from 'react-dom'
import {jssPreset, StylesProvider, ThemeProvider} from '@material-ui/core/styles'
import {Provider} from 'react-redux'
import {ConnectedRouter, routerMiddleware} from 'connected-react-router'
import {Route} from 'react-router-dom'

import './index.css'
import * as serviceWorker from './serviceWorker'
import {theme} from './theme'
import App from './components/App'
import {create} from 'jss'
import rtl from 'jss-rtl'
import {createBrowserHistory} from 'history'
import {applyMiddleware, compose, createStore} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import createRootReducer from './reducers'

/**
 * Created on 1398/10/23 (2020/1/13).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const loggerMiddleware = createLogger()
const history = createBrowserHistory()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
		createRootReducer(history),
		undefined,
		composeEnhancer(applyMiddleware(
				routerMiddleware(history),
				thunkMiddleware,
				loggerMiddleware,
		)),
)

const jss = create({plugins: [...jssPreset().plugins, rtl()]})

ReactDOM.render(
		<StylesProvider jss={jss}>
			<ThemeProvider theme={theme}>
				<Provider store={store}>
					<ConnectedRouter history={history}>
						<React.StrictMode>
							<Route component={App}/>
						</React.StrictMode>
					</ConnectedRouter>
				</Provider>
			</ThemeProvider>
		</StylesProvider>,
		document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
