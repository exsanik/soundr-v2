import { FC, useCallback, useState } from 'react'
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'

import {
  Box,
  createStyles,
  Grid,
  makeStyles,
  TextField,
  IconButton,
  Card,
  CardContent,
  Avatar,
  List,
  ListItemText
} from '@material-ui/core'
import { BiSearch } from 'react-icons/bi'
import { FcCancel, FcCheckmark } from 'react-icons/fc'

import { Loader, Text } from '~/components/shared'

import Sounder from '~/services/sounder'

const useStyles = makeStyles(
  theme =>
    createStyles({
      root: {
        height: 60
      },
      input: {
        fontSize: 30
      },
      label: {
        fontSize: 20
      },
      cardMedia: {
        height: 48,
        width: 48,
        borderRadius: 6,
        marginRight: theme.spacing(3)
      },
      card: {
        cursor: 'pointer',
        backgroundColor: theme.palette.primary.dark
      },
      icon: {
        fontSize: 34
      },
      matchCircle: {
        width: 135,
        height: 135,
        borderRadius: '50%',
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: '#222',
        boxShadow: '10px 10px 12px -6px rgba(0,0,0,0.75)'
      },
      smallCircle: {
        width: 85,
        height: 85,
        borderRadius: '50%',
        display: 'flex',
        padding: theme.spacing(2),
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: theme.palette.primary.dark,
        boxShadow: '10px 10px 12px -6px rgba(0,0,0,0.75)'
      },
      rowSmallCircle: {
        display: 'flex',
        flexDirection: 'row'
      }
    }),
  { name: 'ArtistSearchForm' }
)

type Data = {
  match: string
  features_match: string
  genres_match: [string[], string]
  artists_match: [string[], string]
}

const FriendSearchForm: FC = () => {
  const s = useStyles()
  const { handleSubmit, register } = useForm()
  const { mutateAsync, data, isLoading, isSuccess } = useMutation<Data>(
    Sounder.GET_USER_MATCH,
    Sounder.getUserMatch
  )

  const onSubmit = useCallback(({ id }) => {
    mutateAsync(id)
  }, [])

  return (
    <Box mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="id"
            label="Friend spotify id"
            fullWidth
            InputProps={{
              classes: { root: s.root, input: s.input },
              endAdornment: (
                <>
                  {isLoading ? (
                    <Loader width="auto" />
                  ) : (
                    <IconButton onClick={handleSubmit(onSubmit)}>
                      <BiSearch />
                    </IconButton>
                  )}
                </>
              )
            }}
            InputLabelProps={{
              classes: {
                root: s.label
              }
            }}
            inputRef={register()}
          />
        </Grid>
        {!!data && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Text variant="subtitle1" textAlign="center" mb={1}>
                      Final match:{' '}
                    </Text>
                    <Box className={s.matchCircle}>
                      <Text font="mono" fontSize="60px" m="auto">
                        {parseInt(data.match)}%
                      </Text>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Text textAlign="center" mb={1}>
                          Genres
                        </Text>
                        <Box className={s.smallCircle}>
                          <Text font="mono" fontSize="30px" m="auto">
                            {parseInt(data.genres_match[1])}%
                          </Text>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Text textAlign="center" mb={1}>
                          Features
                        </Text>
                        <Box className={s.smallCircle}>
                          <Text font="mono" fontSize="30px" m="auto">
                            {parseInt(data.features_match)}%
                          </Text>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Text textAlign="center" mb={1}>
                          Artist
                        </Text>
                        <Box className={s.smallCircle}>
                          <Text font="mono" fontSize="30px" m="auto">
                            {parseInt(data.artists_match[1])}%
                          </Text>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Text variant="subtitle1" textAlign="center" mt={4}>
                          Matched artists:
                        </Text>
                      </Grid>
                      {data.artists_match[0].map((artist, idx) => (
                        <Grid item xs={4} key={artist}>
                          <Text textAlign="center">
                            {idx + 1}. {artist}
                          </Text>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Text variant="subtitle1" textAlign="center" mt={8}>
                          Matched genres:
                        </Text>
                      </Grid>
                      {data.genres_match[0].reverse().map((genres, idx) => (
                        <Grid item xs={4} key={genres}>
                          <Text textAlign="center">
                            {idx + 1}. {genres}
                          </Text>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default FriendSearchForm
