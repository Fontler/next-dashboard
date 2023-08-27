import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { useSession, signIn, signOut } from 'next-auth/react'
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton'
import { useMediaQuery, useTheme } from '@mui/material'
import NextLink from 'next/link'

export type HeaderProps = {
	ColorModeContext: React.Context<{ toggleColorMode: () => void }>
}

export default function Header(props: HeaderProps) {
	const { ColorModeContext } = props
	const { data: session } = useSession()
	const theme = useTheme()
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	)

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	const tabletCheck = useMediaQuery('(min-width: 768px')

	return (
		<AppBar position="static" sx={{ marginBottom: '40px' }}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Hamrén
					</Typography>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Hamrén
					</Typography>
					{tabletCheck && (
						<Box sx={{ paddingRight: 5, marginLeft: 'auto' }}>
							<Typography>
								Signed in as {session?.user?.email} <br />
							</Typography>
						</Box>
					)}
					<ThemeToggleButton ColorModeContext={ColorModeContext} />
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open profile settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar
									alt={session?.user?.name as string}
									src={session?.user?.image as string}
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
              <MenuItem>
                <NextLink
                  href={"/dashboard/profile"}
                  style={{
                    color: theme.palette.text.primary,
                    textDecoration: "none",
                  }}
                >
                  <Typography textAlign="center">Profile</Typography>
                </NextLink>
              </MenuItem>
							<MenuItem onClick={() => (session ? signOut() : signIn())}>
								<Typography textAlign="center">
									{session ? 'Sign out' : 'Sign in'}
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
