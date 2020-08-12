import axios from 'axios'
import moment from 'jalali-moment'

const {MARKETS, GROUPS, STOCK_TYPES, MARKET_STATES} = require('./constants')

/**
 * Created on 1399/3/30 (2020/6/19).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const Axios = axios.default

// axios.get('http://www.tsetmc.com/tsev2/res/loader.aspx?t=g&_469')

const DEST_HOSTNAME = 'tsetmc.com'
const DEST_ORIGIN = `http://${DEST_HOSTNAME}`
const PROXY_ORIGIN = 'http://localhost:8686'

export async function fetchWatcherData() {
	setCookie('proxy-settings', encodeURIComponent(JSON.stringify({
		protocol: 'http:',
		hostname: DEST_HOSTNAME,
		headerOverrides: {
			req: {
				Origin: DEST_ORIGIN,
				Referer: 'http://www.tsetmc.com/tsev2/data/MarketWatchInit.aspx',
			},
		},
	})))
	
	const url = new URL(PROXY_ORIGIN)
	url.pathname = '/tsev2/data/MarketWatchInit.aspx'
	url.searchParams.set('h', '0')
	url.searchParams.set('r', '0')
	// 'http://www.tsetmc.com/tsev2/data/MarketWatchInit.aspx?h=0&r=0'
	
	const response = await Axios.get(url.toString(), {
		timeout: 10000,
		withCredentials: true,
	})
	
	// handle success
	const message = response.data
	const [x1, marketInfoS, stocksInfoSS, x2, x3] = message.split('@')
	const [
		marketInfoUpdateTimeS,
		marketState,
		marketIndexValue, marketIndexChange,
		market1Value,
		market1TradesQuantity, market1TradesValue, market1TradesCount, market1State,
		market2TradesQuantity, market2TradesValue, market2TradesCount, market2State,
		x7, x8, x9,
	] = marketInfoS.split(',')
	
	const marketInfoUpdateTime = moment.from(marketInfoUpdateTimeS, 'fa', 'YY/MM/DD HH:mm:ss').toDate()
	
	const marketInfo = {
		updateTime: marketInfoUpdateTime,
		marketState, //marketState: MARKET_STATES[marketState],
		marketIndexValue, marketIndexChange,
		market1Value,
		market1TradesQuantity, market1TradesValue, market1TradesCount, market1State,
		market2TradesQuantity, market2TradesValue, market2TradesCount, market2State,
		x7, x8, x9,
	}
	console.log(marketInfoS)
	console.log(marketInfo)
	
	const headers = [
		'id', 'isin', 'symbol', 'name', 'y1',
		'firstTradePrice', 'finalPrice', 'lastTradePrice', 'tradesCount', 'tradesQuantity', 'tradesValue',
		'minTradePrice', 'maxTradePrice', 'yesterdayPrice',
		'eps', 'baseQuantity', 'y2', 'market', 'group',
		'maxAllowedPrice', 'minAllowedPrice', 'totalStocksCount', 'stockType',
	]
	
	const stocksInfoS = stocksInfoSS.split(';')
	
	const csv = headers.join(',') + '\n' + stocksInfoS.join('\n')
	
	// fs.writeFile('stocks-info.csv', csv, err => {
	// 	if (err) console.error(err)
	// 	else console.log('The file has been saved!')
	// })
	
	const stocksInfo = stocksInfoS.map(stockInfoS => {
		const [
			id, isin, symbol, name, y1,
			firstTradePrice, finalPrice, lastTradePrice, tradesCount, tradesQuantity, tradesValue,
			minTradePrice, maxTradePrice, yesterdayPrice,
			eps, baseQuantity, y2, market, group,
			maxAllowedPrice, minAllowedPrice, totalStocksCount, stockType,
		] = stockInfoS.split(',')
		
		return {
			symbol: symbol.split('ي').join('ی').split('ك').join('ک'),
			name: name.split('ي').join('ی').split('ك').join('ک'),
			id, isin, y1,
			dayInfo: {
				firstTradePrice, finalPrice, lastTradePrice, tradesCount, tradesQuantity, tradesValue,
				minTradePrice, maxTradePrice, yesterdayPrice, maxAllowedPrice, minAllowedPrice,
				baseQuantity,
			},
			eps, y2, market: MARKETS[market], group: GROUPS[group],
			totalStocksCount,
			stockType: STOCK_TYPES[stockType],
		}
	})
	
	console.log(stocksInfo)
	
	return stocksInfo
}

/**
 *
 * @param name
 * @param value CAVEAT: Use `encodeURIComponent()` if you're not sure about the safety of characters.
 * @param lifetime in milliseconds
 * @param path
 * @param additionalParams
 */
function setCookie(name, value, lifetime = 0, path = '', additionalParams = '') {
	let expiresPhrase = ''
	if (lifetime > 0) {
		const date = new Date()
		date.setTime(date.getTime() + lifetime)
		expiresPhrase = '; expires=' + date.toUTCString()
	}
	const pathPhrase = path === '' ? '' : `; path=${path}`
	const additionalParamsPhrase = additionalParams === '' ? '' : `; ${additionalParams}`
	
	document.cookie = `${name}=${value}${expiresPhrase}${pathPhrase}${additionalParamsPhrase}`
}
