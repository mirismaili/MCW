/**
 * Created on 1399/4/5 (2020/6/25).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */
import {Container, Paper} from '@material-ui/core'
import TransactionsTable from './TransactionsTable'
import * as PropTypes from 'prop-types'
import React from 'react'

export function Transactions(props) {
	return <Container maxWidth="lg" className={props.classes.container}>
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
		
		<Paper className={props.classes.mainPaper}>
			<TransactionsTable/>
		</Paper>
		
		{/*<Box pt={4}>*/}
		{/*	<Copyright/>*/}
		{/*</Box>*/}
	</Container>
}

Transactions.propTypes = {classes: PropTypes.any}