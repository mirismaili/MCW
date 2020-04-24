import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import AssignmentIcon from '@material-ui/icons/Assignment'
import TransactionsIcon from '@material-ui/icons/Toc'
import React from 'react'

export const mainListItems = (
		<div>
			<ListItem button>
				<ListItemIcon>
					<TransactionsIcon/>
				</ListItemIcon>
				<ListItemText primary="تراکنش‌ها"/>
			</ListItem>
			{/*<ListItem button>*/}
			{/*	<ListItemIcon>*/}
			{/*		<ShoppingCartIcon/>*/}
			{/*	</ListItemIcon>*/}
			{/*	<ListItemText primary="Orders"/>*/}
			{/*</ListItem>*/}
			{/*<ListItem button>*/}
			{/*	<ListItemIcon>*/}
			{/*		<PeopleIcon/>*/}
			{/*	</ListItemIcon>*/}
			{/*	<ListItemText primary="Customers"/>*/}
			{/*</ListItem>*/}
			{/*<ListItem button>*/}
			{/*	<ListItemIcon>*/}
			{/*		<BarChartIcon/>*/}
			{/*	</ListItemIcon>*/}
			{/*	<ListItemText primary="Reports"/>*/}
			{/*</ListItem>*/}
			{/*<ListItem button>*/}
			{/*	<ListItemIcon>*/}
			{/*		<LayersIcon/>*/}
			{/*	</ListItemIcon>*/}
			{/*	<ListItemText primary="Integrations"/>*/}
			{/*</ListItem>*/}
		</div>
)

export const secondaryListItems = (
		<div>
			<ListSubheader inset>Saved reports</ListSubheader>
			<ListItem button>
				<ListItemIcon>
					<AssignmentIcon/>
				</ListItemIcon>
				<ListItemText primary="Current month"/>
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<AssignmentIcon/>
				</ListItemIcon>
				<ListItemText primary="Last quarter"/>
			</ListItem>
			<ListItem button>
				<ListItemIcon>
					<AssignmentIcon/>
				</ListItemIcon>
				<ListItemText primary="Year-end sale"/>
			</ListItem>
		</div>
)
