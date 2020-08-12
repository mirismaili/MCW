/**
 * Created on 1398/10/23 (2020/1/13).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

export const FETCHING_DATA = 'FETCHING_DATA'
export const FETCHING_FAILED = 'FETCHING_FAILED'
export const DATA_FETCHED = 'DATA_FETCHED'
export const ROUTE = 'ROUTE'
export const MARKET_PULSE = 'MARKET_PULSE'

export const infiniteProgress = {
	// Any positive value (up to positive-infinity) means the progress in the work. So they don't come in this enum.
	DETECTING_STATE: 0,
	FETCHED: -1,
	FAILED: -2,
	IDLE: -3,
}

export const fetchingData = () => ({type: FETCHING_DATA})

export const dataFetched = data => ({type: DATA_FETCHED, data})

export const newRoute = route => ({type: ROUTE, route})

export const fetchingFailed = () => ({type: FETCHING_FAILED})

