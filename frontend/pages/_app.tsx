import { FC } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider, Theme, CssBaseline } from '@material-ui/core'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SnackbarProvider } from 'material-ui-snackbar-provider'

import MainLayout from '~/components/layouts/MainLayout'
import LoginContainer from '~/components/containers/LoginContainer'
import MainLayoutContextProvider from '~/components/layouts/MainLayout/MainLayout.context'

import theme from '~/theme'

const queryClient = new QueryClient()

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider<Theme> theme={theme}>
        <CssBaseline />
        <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
          <MainLayoutContextProvider>
            <Head>
              <title>Sounder v2</title>
            </Head>
            <MainLayout>
              <LoginContainer>
                <Component {...pageProps} />
              </LoginContainer>
            </MainLayout>
          </MainLayoutContextProvider>
        </SnackbarProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
