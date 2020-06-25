import {combineReducers} from 'redux'
import {DATA_FETCHED, MARKET_PULSE, SWITCH_ACTIVE_PANEL} from './actions'
import {connectRouter} from 'connected-react-router'

/**
 * Created on 1398/10/23 (2020/1/13).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const fetchedData = (data, action) => {
	if (action.type !== DATA_FETCHED) return []
	
	return data
}

const activePanel = (panel, action) => {
	if (action.type !== SWITCH_ACTIVE_PANEL) return ''
	
	return panel
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

const createRootReducer = history => combineReducers({
	router: connectRouter(history),
	fetchedData,
	activePanel,
})
export default createRootReducer
