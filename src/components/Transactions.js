import Paper from '@material-ui/core/Paper'
import {withStyles} from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import React from 'react'
import {AutoSizer, Column, Table} from 'react-virtualized'

const styles = (theme) => ({
	flexContainer: {
		display: 'flex',
		alignItems: 'center',
		boxSizing: 'border-box',
	},
	table: {
		// temporary right-to-left patch, waiting for
		// https://github.com/bvaughn/react-virtualized/issues/454
		'& .ReactVirtualized__Table__headerRow': {
			flip: false,
			paddingRight: theme.direction === 'rtl' ? '0px !important' : undefined,
		},
	},
	tableRow: {
		cursor: 'pointer',
	},
	tableRowHover: {
		'&:hover': {
			backgroundColor: theme.palette.grey[200],
		},
	},
	tableCell: {
		flex: 1,
	},
	noClick: {
		cursor: 'initial',
	},
})

class MuiVirtualizedTable extends React.PureComponent {
	static defaultProps = {
		headerHeight: 48,
		rowHeight: 48,
	}
	
	getRowClassName = ({index}) => {
		const {classes, onRowClick} = this.props
		
		return clsx(classes.tableRow, classes.flexContainer, {
			[classes.tableRowHover]: index !== -1 && onRowClick != null,
		})
	}
	
	cellRenderer = ({cellData, columnIndex}) => {
		const {columns, classes, rowHeight, onRowClick} = this.props
		return (
				<TableCell
						component="div"
						className={clsx(classes.tableCell, classes.flexContainer, {
							[classes.noClick]: onRowClick == null,
						})}
						variant="body"
						style={{height: rowHeight}}
						align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
				>
					{cellData}
				</TableCell>
		)
	}
	
	headerRenderer = ({label, columnIndex}) => {
		const {headerHeight, columns, classes} = this.props
		
		return (
				<TableCell
						component="div"
						className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
						variant="head"
						style={{height: headerHeight}}
						align={columns[columnIndex].numeric || false ? 'right' : 'left'}
				>
					<span>{label}</span>
				</TableCell>
		)
	}
	
	render() {
		const {classes, columns, rowHeight, headerHeight, ...tableProps} = this.props
		return (
				<AutoSizer>
					{({height, width}) => (
							<Table
									height={height}
									width={width}
									rowHeight={rowHeight}
									gridStyle={{
										direction: 'inherit',
									}}
									headerHeight={headerHeight}
									className={classes.table}
									{...tableProps}
									rowClassName={this.getRowClassName}
							>
								{columns.map(({dataKey, ...other}, index) => {
									return (
											<Column
													key={dataKey}
													headerRenderer={(headerProps) =>
															this.headerRenderer({
																...headerProps,
																columnIndex: index,
															})
													}
													className={classes.flexContainer}
													cellRenderer={this.cellRenderer}
													dataKey={dataKey}
													{...other}
											/>
									)
								})}
							</Table>
					)}
				</AutoSizer>
		)
	}
}

MuiVirtualizedTable.propTypes = {
	classes: PropTypes.object.isRequired,
	columns: PropTypes.arrayOf(
			PropTypes.shape({
				dataKey: PropTypes.string.isRequired,
				label: PropTypes.string.isRequired,
				numeric: PropTypes.bool,
				width: PropTypes.number.isRequired,
			}),
	).isRequired,
	headerHeight: PropTypes.number,
	onRowClick: PropTypes.func,
	rowHeight: PropTypes.number,
}

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable)

// ---

const sample = [
	['ذوب', 159, 6.0, 24, 4.0],
	['ثاخت', 237, 9.0, 37, 4.3],
	['لبوتان', 262, 16.0, 24, 6.0],
	['بموتو', 305, 3.7, 67, 4.3],
	['ساینا', 356, 16.0, 49, 3.9],
]

function createData(id, symbol, volume, uPrice, transactionValue, remindedCash) {
	return {id, symbol, volume, uPrice, transactionValue, remindedCash}
}

const rows = []

for (let i = 0; i < 200; i++) {
	const randomSelection = sample[Math.floor(Math.random() * sample.length)]
	rows.push(createData(i, ...randomSelection))
}

export default function Transactions() {
	return (
			<Paper style={{height: 400, width: '100%', padding: '8px'}}>
				<VirtualizedTable
						rowCount={rows.length}
						rowGetter={({index}) => rows[index]}
						columns={[
							{
								width: 200,
								label: 'نماد',
								dataKey: 'symbol',
							},
							{
								width: 120,
								label: 'تعداد',
								dataKey: 'volume',
								numeric: true,
							},
							{
								width: 120,
								label: 'قیمت واحد',
								dataKey: 'uPrice',
								numeric: true,
							},
							{
								width: 120,
								label: 'ارزش تراکنش',
								dataKey: 'transactionValue',
								numeric: true,
							},
							{
								width: 120,
								label: 'مانده نقد',
								dataKey: 'remindedCash',
								numeric: true,
							},
						]}
				/>
			</Paper>
	)
}
