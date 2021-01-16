import { FC } from 'react'
import { useQuery } from 'react-query'

import { FaSpotify } from 'react-icons/fa'
import { Box, createStyles, makeStyles } from '@material-ui/core'

import { Text, Button } from '~/components/shared'
import marshSrc from '~/public/images/index_marsh.svg'
import Sounder from '~/services/sounder'

const useStyles = makeStyles(
  theme =>
    createStyles({
      root: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '60px',
        width: 'fit-content',
        '& svg': {
          fontSize: 32,
          marginRight: theme.spacing(2)
        },
        padding: theme.spacing(0, 4),
        border: '1px solid #000'
      },
      image: {
        position: 'absolute',
        top: -100,
        right: -50,
        height: 100
      }
    }),
  { name: 'SpotifyButton' }
)

const SpotifyButton: FC = () => {
  const s = useStyles()
  const { refetch } = useQuery(Sounder.GET_LOGIN_URL, Sounder.getLoginUrl, {
    enabled: false,
    onSuccess: data => {
      if (data) {
        window.location.href = data.login_url
      }
    }
  })

  return (
    <Box position="relative" margin="auto">
      <img src={marshSrc} className={s.image} alt="marshmellow" />
      <Button className={s.root} onClick={() => refetch()}>
        <FaSpotify />{' '}
        <Text variant="subtitle1" fontWeight="bold">
          Login with Spotify
        </Text>
      </Button>
    </Box>
  )
}

export default SpotifyButton
