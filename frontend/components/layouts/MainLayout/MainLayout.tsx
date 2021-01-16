import { FC } from 'react'

import { createStyles, makeStyles, Container, Theme } from '@material-ui/core'

import Header from '~/components/layouts/Header'
import Footer from '~/components/layouts/Footer'

import { useLayoutContext, ContextValue } from './MainLayout.context'

const useStyles = makeStyles<Theme, ContextValue>(
  theme =>
    createStyles<string, ContextValue>({
      page: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: '100vh',
        [theme.breakpoints.down('xs')]: {
          overflowX: 'hidden'
        },
        backgroundImage: ({ backgroundSrc }) => `url(${backgroundSrc})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 60%',
        [theme.breakpoints.down('sm')]: {
          backgroundSize: '200% 60%'
        },
        backgroundPosition: '100% 95%'
      },

      container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        minWidth: 0
      }
    }),
  { name: 'AppLayout' }
)

const AppLayout: FC = ({ children }) => {
  const { pageStyles } = useLayoutContext()
  const s = useStyles(pageStyles)

  return (
    <div className={s.page}>
      <Header />

      <Container component="main" maxWidth="xl" className={s.container}>
        <>{children}</>
      </Container>

      <Footer />
    </div>
  )
}

export default AppLayout
