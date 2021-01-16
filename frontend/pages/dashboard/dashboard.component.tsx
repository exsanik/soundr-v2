import { FC, useCallback, useState } from 'react'
import { useQuery } from 'react-query'

import { Button, Text } from '~/components/shared'
import { Box, createStyles, makeStyles } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { useSnackbar } from 'material-ui-snackbar-provider'

import ArtistSearchForm from './components/ArtistSearchForm'
import FriendSearchForm from './components/FriendSearchForm'

import Sounder from '~/services/sounder'

const useStyles = makeStyles(
  createStyles({
    toggleButtons: {
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }),
  {
    name: 'Dashboard'
  }
)

enum Choise {
  artist = 'artist',
  friend = 'friend'
}

const Dashboard: FC = () => {
  const s = useStyles()
  const [choice, setChoice] = useState<Choise>(Choise.artist)
  const snackbar = useSnackbar()

  const { refetch, isFetching } = useQuery(
    Sounder.GET_USER_LOAD_DATA,
    Sounder.getUserLoadData,
    {
      enabled: false,
      onSuccess: () => {
        snackbar.showMessage('Success! Your data was updated!')
      },
      onError: () => {
        snackbar.showMessage('Oops! Something went wrong!')
      }
    }
  )

  const handleSelectChoice = useCallback(() => {
    setChoice(cChoice => {
      if (cChoice === Choise.artist) {
        return Choise.friend
      }
      return Choise.artist
    })
  }, [setChoice])

  return (
    <Box display="flex" flexDirection="column" height="100%" mb="auto">
      <Button
        variant="contained"
        onClick={() => refetch()}
        mb="auto"
        mt={3}
        ml="auto"
        loading={isFetching}
      >
        Update my spotify data 🎧
      </Button>

      <Box>
        <Text font="mono" variant="subtitle1" fontSize={36} textAlign="center">
          Search:
        </Text>
        <Box display="flex" flexDirection="column" mt={1}>
          <ToggleButtonGroup
            className={s.toggleButtons}
            value={choice}
            onChange={handleSelectChoice}
          >
            <ToggleButton value="artist">
              <Text>🎶 by Artist</Text>
            </ToggleButton>
            <ToggleButton value="friend">
              <Text>💁‍♂️ by Friend 💁‍♀️</Text>
            </ToggleButton>
          </ToggleButtonGroup>

          {choice === Choise.artist && <ArtistSearchForm />}
          {choice === Choise.friend && <FriendSearchForm />}
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard
