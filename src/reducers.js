import {combineReducers} from 'redux'
import {DATA_FETCHED, FETCHING_DATA, FETCHING_FAILED, MARKET_PULSE, ROUTE, THEME} from './actions'
import {theme1} from './themes'

/**
 * Created on 1398/10/23 (2020/1/13).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const watcherData = (state = {fetching: false}, action) => {
	switch (action.type) {
		case DATA_FETCHED:
			return {...state, fetching: false, data: action.data}
		case FETCHING_DATA:
			return {...state, fetching: true}
		case FETCHING_FAILED:
			return {...state, fetching: false, data: null}
	}
	return state
}

const route = (state = {location: {pathname: '/'}}, action) => {
	if (action.type !== ROUTE) return state
	
	return {...state, ...action.route}
}

const theme = (state = theme1, action) => {
	if (action.type !== THEME || state === action.theme) return state
	
	return action.theme
}

function marketPulse(state = {index1: 0, index2: 0}, action) {
	switch (action.type) {
		case MARKET_PULSE:
			return Object.assign({}, state, {
				index1: action.index1,
				index2: action.index2,
			})
		default:
			return state
	}
}

const rootReducer = combineReducers({
	watcherData,
	route,
	theme,
})
export default rootReducer
