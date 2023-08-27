import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme} from '@mui/material'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import React from 'react'
import darkTheme from '@/theme/darkTheme'
import lightTheme from '@/theme/lightTheme'
import Header from '@/components/Header/Header'
import Layout from '@/components/Layout'

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const darkThemeChosen = React.useMemo(
        () =>
            createTheme({
                ...darkTheme
            }),
        [],
    )
    const lightThemeChosen = React.useMemo(
        () =>
            createTheme({
                ...lightTheme,
            }),
        [],
    )

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={mode === 'dark' ? darkThemeChosen : lightThemeChosen}>
				<SessionProvider session={pageProps.session}>
					<CssBaseline />
          <Header ColorModeContext={ColorModeContext} />
          <Layout>
            <Component {...pageProps} />
          </Layout>
				</SessionProvider>
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}