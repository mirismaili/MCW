/**
 * Created on 1398/10/23 (2020/1/13).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */
import {applyMiddleware, createStore} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()
export default function configureStore(preloadedState) {
	return createStore(
			rootReducer,
			preloadedState,
			applyMiddleware(thunkMiddleware, loggerMiddleware)
	)
}
