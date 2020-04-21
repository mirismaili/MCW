/**
 * Created on 1398/10/23 (2020/1/13).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import configureStore from '../configureStore'
import Dashboard from './Dashboard'

const store = configureStore()

export default class Root extends Component {
	render() {
		return (
				<Provider store={store}>
					<Dashboard/>
				</Provider>
		)
	}
}
