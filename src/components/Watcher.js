import {Container, Paper} from '@material-ui/core'
import * as PropTypes from 'prop-types'
import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'
import {connect} from 'react-redux'

import WatchTable from './WatchTable'
import {dataFetched, fetchingData, fetchingFailed} from '../actions'
import {fetchWatcherData} from '../functions'

/**
 * Created on 1399/4/5 (2020/6/25).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

const ProgressBar = connect(
		state => ({visibility: state.watcherData.fetching}),
)(props =>
		<LinearProgress style={{...props.style, display: props.visibility ? 'block' : 'none'}}/>,
)

class Watcher extends React.Component {
	componentDidMount() {
		const dispatch = this.props.dispatch
		dispatch(fetchingData())
		
		fetchWatcherData()
		.then(data => dispatch(dataFetched(data)))
		.catch(e => {
			console.error(e)
			dispatch(fetchingFailed())
		})
	}
	
	render() {
		return <Container maxWidth="lg" className={this.props.classes.container}>
			<Paper className={this.props.classes.mainPaper} style={{position: 'relative'}}>
				<WatchTable/>
				<ProgressBar style={{position: 'absolute', left: 0, right: 0, top: 0}}/>
			</Paper>
		</Container>
	}
}

Watcher.propTypes = {classes: PropTypes.any}

export default connect()(Watcher)

