import {jssPreset, StylesProvider, ThemeProvider} from '@material-ui/core/styles'
import {create} from 'jss'
import rtl from 'jss-rtl'
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Route} from 'react-router-dom'
import {ConnectedRouter} from 'connected-react-router'

import {theme} from './theme'
import Dashboard from './components/Dashboard'
import configureStore, {history} from './configureStore'

/**
 * Created on 1398/10/23 (2020/1/13).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const store = configureStore()

const jss = create({plugins: [...jssPreset().plugins, rtl()]})

export default class App extends Component {
	render() {
		return (
				<StylesProvider jss={jss}>
					<ThemeProvider theme={theme}>
						<Provider store={store}>
							<ConnectedRouter history={history}>
								<React.StrictMode>
									<Route component={Dashboard}/>
								</React.StrictMode>
							</ConnectedRouter>
						</Provider>
					</ThemeProvider>
				</StylesProvider>
		)
	}
}
