import {
	AppBar,
	Badge,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	List,
	SwipeableDrawer,
	Toolbar,
	Typography,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import clsx from 'clsx'
import React from 'react'
import {isMobile} from 'react-device-detect'

import {mainListItems} from './listItems'
import {Route, Switch} from 'react-router-dom'
import {Transactions} from './Transactions'
import {Watch} from './Watch'

const drawerWidth = 240

const useStyles = makeStyles(theme => {
	const paperStyle = {
		padding: theme.spacing(2),
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
			...paperStyle,
			height: 240,
		},
		mainPaper: {
			...paperStyle,
			//marginTop: theme.spacing(4),
			flexGrow: 1,
			paddingRight: 0,
			paddingBottom: 0,
		},
	}
})

function App() {
	const classes = useStyles()
	const [open, setOpen] = React.useState(!isMobile)
	const handleDrawerOpen = () => {
		setOpen(true)
	}
	const handleDrawerClose = () => {
		setOpen(false)
	}
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
	
	const drawerClasses = {paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)}
	return (
			<div className={classes.root}>
				<CssBaseline/>
				<AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
					<Toolbar className={classes.toolbar}>
						<IconButton
								edge="start"
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerOpen}
								className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
						>
							<MenuIcon/>
						</IconButton>
						<Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
							<Switch>
								<Route path="/watch">
									دیده‌بان
								</Route>
								<Route path="/">
									تراکنش‌ها
								</Route>
							</Switch>
						</Typography>
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
								open={open}
						>
							{drawerContents}
						</SwipeableDrawer> :
						<Drawer
								variant='persistent'
								classes={drawerClasses}
								open={open}>
							{drawerContents}
						</Drawer>
				}
				
				<main className={classes.content}>
					<div className={classes.appBarSpacer}/>
					<Switch>
						<Route path="/watch">
							<Watch classes={classes}/>
						</Route>
						<Route exact path="/">
							<Transactions classes={classes}/>
						</Route>
					</Switch>
				</main>
			</div>
	)
}

export default App
