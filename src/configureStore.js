import {createBrowserHistory} from 'history'
import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import createRootReducer from './reducers'

/**
 * Created on 1398/10/23 (2020/1/13).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const loggerMiddleware = createLogger()
export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
	const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
	return createStore(
			createRootReducer(history),
			preloadedState,
			composeEnhancer(
					applyMiddleware(
							routerMiddleware(history),
							thunkMiddleware,
							loggerMiddleware,
					),
			),
	)
}
