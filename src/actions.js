/**
 * Created on 1398/10/23 (2020/1/13).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

export const SIGNING_IN = 'signing-in'
export const MARKET_PULSE = 'market-pulse'
export const SIGNED_IN = 'SIGNED_IN'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export const infiniteProgress = {
	// Any positive value (up to positive-infinity) means the progress in the work. So they don't come in this enum.
	DETECTING_STATE: 0,
	SUCCESSFUL: -1,
	FAILED_TRY: -2,
	IDLE: -3,
}

export function selectSubreddit(subreddit) {
	return {
		type: SIGNED_IN,
		subreddit
	}
}

export function invalidateSubreddit(subreddit) {
	return {
		type: INVALIDATE_SUBREDDIT,
		subreddit
	}
}

function signingIn(progress, userId = -1) {
	return {
		type: SIGNING_IN,
		progress,
		userId,
	}
}

function signIn() {
	return async (dispatch, getState) => {
		dispatch(signingIn(1))
	}
}

async function shouldSignIn(state) {
	return false
}

export function signInIfNeeded() {
	return async (dispatch, getState) => {
		if (await shouldSignIn(getState())) {
			return dispatch(signIn())
		}
	}
}
