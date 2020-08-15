import {blue, green, orange, red} from '@material-ui/core/colors'
import {enUS, faIR} from '@material-ui/core/locale'
import vazirThinWoff2 from './fonts/Vazir-Thin.woff2'
import vazirLightWoff2 from './fonts/Vazir-Light.woff2'
import vazirWoff2 from './fonts/Vazir.woff2'
import vazirMediumWoff2 from './fonts/Vazir-Medium.woff2'
import vazirBoldWoff2 from './fonts/Vazir-Bold.woff2'
import vazirBlackWoff2 from './fonts/Vazir-Black.woff2'

/**
 * Created on 1398/10/28 (2020/1/18).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

export const locales = {
	'fa-IR': faIR,
	'en-US': enUS,
}

const VAZIR_FONT_FAMILY = 'Vazir'

const vazirVariants = [
	{
		weight: 100,
		local: 'Vazir Thin',
		url: vazirThinWoff2,
	}, {
		weight: 300,
		local: 'Vazir Light',
		url: vazirLightWoff2,
	}, {
		weight: 'normal',  // 400
		local: 'Vazir',
		url: vazirWoff2,
	}, {
		weight: 500,
		local: 'Vazir Medium',
		url: vazirMediumWoff2,
	}, {
		weight: 'bold',  // 700
		local: 'Vazir Bold',
		url: vazirBoldWoff2,
	}, {
		weight: 900,
		local: 'Vazir Black',
		url: vazirBlackWoff2,
	},
]

const vazirFamily = vazirVariants.map(({weight, local, url}) => ({
	fontFamily: VAZIR_FONT_FAMILY,
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

export const theme1 = {
	locale: 'fa-IR',
	direction: 'rtl',
	typography: {
		// caption: {
		// 	fontWeight: 'bold',
		// },
		fontFamily: [
			VAZIR_FONT_FAMILY,
			'Roboto',
			'Helvetica',
			'Arial',
			'sans-serif',
		].join(','),
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {
				'@font-face': [
					...vazirFamily,
				],
			},
		},
	},
	palette: {
		primary: green,
		type: 'light',
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
		},
	},
}

export const theme2 = {
	locale: 'en-US',
	direction: 'ltr',
	typography: {
		// caption: {
		// 	fontWeight: 'bold',
		// },
		fontFamily: [
			'Roboto',
			'Helvetica',
			'Arial',
			'sans-serif',
		].join(','),
	},
	palette: {
		type: 'dark',
		primary: red,
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
		},
	},
}

export default {theme1, theme2}
