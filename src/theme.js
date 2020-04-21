import {green, red, blue, orange} from '@material-ui/core/colors'
import {createMuiTheme} from '@material-ui/core/styles'
import iranSansWoff2 from './fonts/IRANSansWeb.woff2'
import iranSansBoldWoff2 from './fonts/IRANSansWeb_Bold.woff2'
import iranSansLightWoff2 from './fonts/IRANSansWeb_Light.woff2'
import iranSansMediumWoff2 from './fonts/IRANSansWeb_Medium.woff2'

/**
 * Created on 1398/10/28 (2020/1/18).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const IRAN_SANS_FONT_FAMILY = 'IRANSans'

const iranSansVariants = [{
// 	weight: 200,
// 	local: 'IRANSans UltraLight',
// 	url: iranSansUltraLightWoff2,
// }, {
	weight: 300,
	local: 'IRANSans Light',
	url: iranSansLightWoff2,
}, {
	weight: 400,
	local: 'IRANSans',
	url: iranSansWoff2,
}, {
	weight: 500,
	local: 'IRANSans Medium',
	url: iranSansMediumWoff2,
}, {
	weight: 300,
	local: 'IRANSans Bold',
	url: iranSansBoldWoff2,
}]

const iranSansFamily = iranSansVariants.map(({weight, local, url}) => ({
	fontFamily: IRAN_SANS_FONT_FAMILY,
	fontStyle: 'normal',
	//fontDisplay: 'swap',
	fontWeight: weight,
	src: [
		...process.env.NODE_ENV === 'development' ? [] : [`local("${local}")`],
		`url("${url}") format("woff2")`,
	].join(','),
	//unicodeRange: 'U+0600-08FF', //'U+0628-0651, U+067E, U+0686, U+0698, U+06A9, U+06AF, U+06C0, U+06CC, U+06F0-06F9',
}))

// export const start = 'left'
// export const end = 'right'

//const defaultTheme = createMuiTheme()

export const theme = createMuiTheme({
	direction: 'rtl',
	typography: {
		// caption: {
		// 	fontWeight: 'bold',
		// },
		fontFamily: [
			IRAN_SANS_FONT_FAMILY,
			'Roboto',
			'Helvetica',
			'Arial',
			'sans-serif'
		].join(',')
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'@font-face': [
					...iranSansFamily,
				],
			},
		},
	},
	palette: {
		trade: {
			profit: {
				primary: green[500],
				secondary: green[300],
			},
			loss: {
				primary: red[600],
				secondary: red[400],
			},
			buy: {
				primary: blue[700],
				secondary: blue[200],
			},
			sell: {
				primary: orange[700],
				secondary: orange[200],
			},
		}
	},
})

export default theme
