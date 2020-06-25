import {Container, Link, Paper, Typography} from '@material-ui/core'
import * as PropTypes from 'prop-types'
import React from 'react'
import WatchTable from './WatchTable'

/**
 * Created on 1399/4/5 (2020/6/25).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

export function Watch(props) {
	return <Container maxWidth="lg" className={props.classes.container}>
		<Paper className={props.classes.mainPaper}>
			<WatchTable/>
		</Paper>
	</Container>
}

Watch.propTypes = {classes: PropTypes.any}

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
