/**
 * Created on 1398/10/23 (2020/1/13).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

import {combineReducers} from 'redux'
import {infiniteProgress, MARKET_PULSE, SIGNING_IN,} from './actions'

function signingIn(state = {progress: infiniteProgress.DETECTING_STATE, userId: -1}, action) {
	switch (action.type) {
		case SIGNING_IN:
			return Object.assign({}, state, {
				progress: action.progress,
				userId: action.userId,
			})
		default:
			return state
	}
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
	signingIn,
	marketPulse: marketPulse,
})
export default rootReducer
