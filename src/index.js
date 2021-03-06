import React from 'react'
import * as ReactDOM from 'react-dom'
import {createMuiTheme, jssPreset, StylesProvider, ThemeProvider} from '@material-ui/core/styles'
import {connect, Provider} from 'react-redux'
// import {ConnectedRouter, routerMiddleware} from 'connected-react-router'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {create} from 'jss'
import rtl from 'jss-rtl'
import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import './index.css'
import * as serviceWorker from './serviceWorker'
import App from './components/App'
import rootReducer from './reducers'
import {locales} from './themes'

/**
 * Created on 1398/10/23 (2020/1/13).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const loggerMiddleware = createLogger()

const store = createStore(
		rootReducer,
		undefined,
		applyMiddleware(
				thunkMiddleware,
				loggerMiddleware,
		),
)

const jss = create({plugins: [...jssPreset().plugins, rtl()]})

const DynamicThemeProvider = connect(state => ({theme: state.theme}))(props =>
		<ThemeProvider theme={createMuiTheme(props.theme, locales[props.theme.locale])} children={props.children}/>,
)

ReactDOM.render(
		<React.StrictMode>
			<Provider store={store}>
				<StylesProvider jss={jss}>
					<DynamicThemeProvider>
						<Router>
							<Route component={App}/>
						</Router>
					</DynamicThemeProvider>
				</StylesProvider>
			</Provider>
		</React.StrictMode>,
		document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
