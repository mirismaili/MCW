/**
 * Created on 1398/10/23 (2020/1/13).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */
import {ThemeProvider} from '@material-ui/core/styles'
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from '../configureStore'
import {theme} from '../theme'
import Dashboard from './Dashboard'

const store = configureStore()

export default class Root extends Component {
	render() {
		return (
				<Provider store={store}>
					<ThemeProvider theme={theme}>
						<Dashboard/>
					</ThemeProvider>
				</Provider>
		)
	}
}
