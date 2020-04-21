import {StylesProvider, jssPreset, ThemeProvider} from '@material-ui/core/styles'
import {create} from 'jss'
import rtl from 'jss-rtl'
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from '../configureStore'
import {theme} from '../theme'
import Dashboard from './Dashboard'

/**
 * Created on 1398/10/23 (2020/1/13).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const store = configureStore()
const jss = create({plugins: [...jssPreset().plugins, rtl()]})

export default class Root extends Component {
	render() {
		return (
				<StylesProvider jss={jss}>
					<ThemeProvider theme={theme}>
						<Provider store={store}>
							<Dashboard/>
						</Provider>
					</ThemeProvider>
				</StylesProvider>
		)
	}
}
