import {
	AppBar,
	Badge,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	List,
	SwipeableDrawer,
	Switch,
	Toolbar,
	Typography,
} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import clsx from 'clsx'
import React from 'react'
import {isMobile} from 'react-device-detect'
import {connect} from 'react-redux'

import {mainListItems} from './listItems'
import {Route, Switch as RouterSwitch} from 'react-router-dom'
import {Transactions} from './Transactions'
import Watcher from './Watcher'
import {theme1, theme2} from '../themes'
import {newRoute, setTheme} from '../actions'

/**
 * Created on 1398/10/23 (2020/1/13).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const drawerWidth = 240

const styles = theme => {
	const paper = {
		padding: theme.spacing(2),
	}
	const linearPaper = {
		...paper,
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	}
	
	return {
		root: {
			display: 'flex',
		},
		toolbar: {
			paddingRight: 24, // keep right padding when drawer closed
		},
		toolbarIcon: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-end',
			padding: '0 8px',
			...theme.mixins.toolbar,
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarShift: {
			marginLeft: drawerWidth,
			width: `calc(100% - ${drawerWidth}px)`,
			transition: theme.transitions.create(['width', 'margin'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		menuButton: {
			marginRight: 36,
		},
		menuButtonHidden: {
			display: 'none',
		},
		title: {
			flexGrow: 1,
		},
		drawerPaper: {
			position: 'relative',
			whiteSpace: 'nowrap',
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerPaperClose: {
			overflowX: 'hidden',
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9),
			},
		},
		appBarSpacer: theme.mixins.toolbar,
		content: {
			display: 'flex',
			flexFlow: 'column',
			flexGrow: 1,
			height: '100vh',
			overflow: 'auto',
		},
		container: {
			display: 'flex',
			flexFlow: 'column',
			flexGrow: 1,
			paddingTop: theme.spacing(4),
			paddingBottom: theme.spacing(4),
		},
		fixedHeightPaper: {
			...linearPaper,
			height: 240,
		},
		mainPaper: {
			...linearPaper,
			//marginTop: theme.spacing(4),
			flexGrow: 1,
			paddingRight: 0,
			paddingBottom: 0,
		},
	}
}

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			open: !isMobile,
		}
	}
	
	componentDidMount() {
		// console.log(this.props.location)
		// console.log(this.props.action)
		
		this.unlisten = this.props.history.listen((location, action) =>
				this.props.dispatch(newRoute({location, action})),
		)
	}
	
	componentWillUnmount() {
		this.unlisten()
	}
	
	render() {
		const handleDrawerOpen = () => {
			this.setState({open: true})
		}
		const handleDrawerClose = () => {
			this.setState({open: true})
		}
		
		const {classes} = this.props
		
		const drawerContents = <>
			<div className={classes.toolbarIcon}>
				<IconButton onClick={handleDrawerClose}>
					<ChevronLeftIcon/>
				</IconButton>
			</div>
			<Divider/>
			<List>{mainListItems}</List>
			{/*<Divider/>*/}
			{/*<List>{secondaryListItems}</List>*/}</>
		
		const drawerClasses = {paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerPaperClose)}
		return (
				<div className={classes.root}>
					<CssBaseline/>
					<AppBar position="absolute" className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
						<Toolbar className={classes.toolbar}>
							<IconButton
									edge="start"
									color="inherit"
									aria-label="open drawer"
									onClick={handleDrawerOpen}
									className={clsx(classes.menuButton, this.state.open && classes.menuButtonHidden)}
							>
								<MenuIcon/>
							</IconButton>
							<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
								<RouterSwitch>
									<Route path="/watch">
										دیده‌بان
									</Route>
									<Route path="/">
										تراکنش‌ها
									</Route>
								</RouterSwitch>
							</Typography>
							<Switch onChange={(event, checked) => {
								const [lang, direction, theme] = checked ? ['en', 'ltr', theme2] : ['fa', 'rtl', theme1]
								document.documentElement.lang = lang
								document.documentElement.dir = direction
								this.props.dispatch(setTheme(theme))
							}
							}/>
							<IconButton color="inherit">
								<Badge badgeContent={4} color="secondary">
									<NotificationsIcon/>
								</Badge>
							</IconButton>
						</Toolbar>
					</AppBar>
					
					{isMobile ?
							<SwipeableDrawer
									variant='persistent'
									classes={drawerClasses}
									open={this.state.open}
							>
								{drawerContents}
							</SwipeableDrawer> :
							<Drawer
									variant='persistent'
									classes={drawerClasses}
									open={this.state.open}>
								{drawerContents}
							</Drawer>
					}
					
					<main className={classes.content}>
						<div className={classes.appBarSpacer}/>
						<RouterSwitch>
							<Route path="/watch">
								<Watcher classes={classes}/>
							</Route>
							<Route exact path="/">
								<Transactions classes={classes}/>
							</Route>
						</RouterSwitch>
					</main>
				</div>
		)
	}
}

export default connect()(withStyles(styles)(App))
