/**
 * Created on 1398/10/23 (2020/1/13).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

export const FETCHING_DATA = 'FETCHING_DATA'
export const DATA_FETCHED = 'DATA_FETCHED'
export const SWITCH_ACTIVE_PANEL = 'SWITCH_ACTIVE_PANEL'
export const MARKET_PULSE = 'MARKET_PULSE'

export const infiniteProgress = {
	// Any positive value (up to positive-infinity) means the progress in the work. So they don't come in this enum.
	DETECTING_STATE: 0,
	FETCHED: -1,
	FAILED: -2,
	IDLE: -3,
}

function resolvingData(progress) {
	return {
		type: FETCHING_DATA,
		progress,
	}
}

