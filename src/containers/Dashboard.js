import AppBar from '@material-ui/core/AppBar'
import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import clsx from 'clsx'
import React from 'react'
import {isMobile} from 'react-device-detect'
import {mainListItems} from '../components/listItems'
import TransactionsTable from '../components/TransactionsTable'

function Copyright() {
	return (
			<Typography variant="body2" color="textSecondary" align="center">
				{'Copyright © '}
				<Link color="inherit" href="https://material-ui.com/">
					Your Website
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
	)
}

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

function Dashboard() {
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
							تراکنش‌ها
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
								open={open}>
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
					<Container maxWidth="lg" className={classes.container}>
						{/*<Grid container spacing={3}>*/}
						{/*	<Grid item xs={12} md={8} lg={9}>*/}
						{/*		<Paper className={classes.fixedHeightPaper}>*/}
						{/*			<Chart/>*/}
						{/*		</Paper>*/}
						{/*	</Grid>*/}
						{/*	*/}
						{/*	<Grid item xs={12} md={4} lg={3}>*/}
						{/*		<Paper className={classes.fixedHeightPaper}>*/}
						{/*			<Deposits/>*/}
						{/*		</Paper>*/}
						{/*	</Grid>*/}
						{/*</Grid>*/}
						
						<Paper className={classes.mainPaper}>
							<TransactionsTable/>
						</Paper>
						
						{/*<Box pt={4}>*/}
						{/*	<Copyright/>*/}
						{/*</Box>*/}
					</Container>
				</main>
			</div>
	)
}

export default Dashboard
