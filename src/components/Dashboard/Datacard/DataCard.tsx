import { Paper } from '@mui/material'
import scss from './DataCard.module.scss'
import React from 'react'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

export type DataCardProps = {
	title: string
	value: string
	description: string
}

export default function DataCard(props: DataCardProps) {
  const { title, value, description } = props;
	return (
		<Paper className={scss.dataCard}>
			<div className={scss.header}>
				<Typography variant="h6" color={'lightslategrey'}>
					{title}
				</Typography>
				<Tooltip
					title={
						<Typography
							fontSize={16}
						>{`${description} which is ${value}`}</Typography>
					}
				>
					<IconButton>
						<InfoOutlinedIcon />
					</IconButton>
				</Tooltip>
			</div>
			<Typography variant='h4'>{value}</Typography>
		</Paper>
	)
}