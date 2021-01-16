import { FC } from 'react'
import { useQueryClient } from 'react-query'

import {
  Box,
  Card,
  Grid,
  CardContent,
  makeStyles,
  createStyles,
  IconButton
} from '@material-ui/core'
import { FiCopy } from 'react-icons/fi'
import { useSnackbar } from 'material-ui-snackbar-provider'

import Sounder from '~/services/sounder'
import { Text } from '~/components/shared'

import { User } from '~/interfaces/User'

const useStyles = makeStyles(
  theme =>
    createStyles({
      card: {
        marginBottom: 'auto',
        marginTop: theme.spacing(2)
      },
      code: {
        borderRadius: 40,
        backgroundColor: theme.palette.grey['600'],
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        '& svg': {
          fontSize: 22
        },
        '& button': {
          marginRight: theme.spacing(1)
        }
      }
    }),
  { name: 'ProfilePage' }
)

const Profile: FC = () => {
  const s = useStyles()

  const queryClient = useQueryClient()
  const userData = queryClient.getQueryState<User>(Sounder.GET_USER_ME)
  const snackbar = useSnackbar()

  return (
    <Card className={s.card}>
      <CardContent>
        {userData?.status === 'success' && (
          <Box
            display="flex"
            height={{ xs: 'auto', sm: '200px' }}
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            {userData.data?.image_url && (
              <Box
                mr={{ xs: 0, sm: 5 }}
                mb={2}
                boxShadow="10px 10px 12px -6px rgba(0,0,0,0.75)"
              >
                <img src={userData.data?.image_url} alt="profile picture" />
              </Box>
            )}
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <strong>Name: </strong>
              </Grid>
              <Grid item xs={10}>
                <Text>{userData.data?.name}</Text>
              </Grid>

              {userData.data?.email && (
                <>
                  <Grid item xs={2}>
                    <strong>Email: </strong>
                  </Grid>
                  <Grid item xs={10}>
                    <Text>{userData.data?.email}</Text>
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Text ml={2} mb={-1.5}>
                  Your spotify id:
                </Text>
              </Grid>
              <Grid item xs={12}>
                <Box className={s.code}>
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(
                        userData.data?.spotify_id || ''
                      )
                      snackbar.showMessage('Spotify id was copied')
                    }}
                  >
                    <FiCopy />
                  </IconButton>
                  <Text>{userData.data?.spotify_id}</Text>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default Profile
