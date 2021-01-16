import { FC, useCallback } from 'react'
import { useRouter } from 'next/dist/client/router'
import { useQueryClient } from 'react-query'

import { Box, Container, createStyles, makeStyles } from '@material-ui/core'

import { Image, Link, Text } from '~/components/shared'
import Sounder from '~/services/sounder'

import logoSrc from '~/public/logo.svg'

const useStyles = makeStyles(
  theme =>
    createStyles({
      root: {
        borderBottom: `2px solid ${theme.palette.primary.dark}`,
        position: 'sticky',
        height: 65
      },
      container: {
        height: '100%'
      },
      logoutButton: {
        cursor: 'pointer'
      }
    }),
  { name: 'Header' }
)

const Header: FC = () => {
  const s = useStyles()
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleLogout = useCallback(() => {
    Sounder.setAuthToken('')
    router.push('/')
    queryClient.invalidateQueries(Sounder.GET_USER_ME)
  }, [])

  return (
    <Box className={s.root}>
      <Container className={s.container}>
        <Box display="flex" width="100%" height="100%" alignItems="center">
          <Link href="/dashboard">
            <Image
              src={logoSrc}
              alt="Logo"
              wrapperProps={{ ml: -4, mt: -0.5, height: '65px !important' }}
            />
          </Link>

          <Box display="flex" alignItems="center" ml="auto">
            <Link href="/profile">
              <Text font="mono" mr={2}>
                Profile
              </Text>
            </Link>
            <Text
              className={s.logoutButton}
              font="mono"
              mr={2}
              onClick={handleLogout}
            >
              Logout
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Header
