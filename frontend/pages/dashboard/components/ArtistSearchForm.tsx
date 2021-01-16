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
  Avatar
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
      }
    }),
  { name: 'ArtistSearchForm' }
)

type DataImage = {
  url: string
  width: number
  height: number
}

type Data = {
  id: string
  images: DataImage[]
  name: string
  genres: string[]
}

const ArtistSearchForm: FC = () => {
  const s = useStyles()
  const { handleSubmit, register } = useForm()
  const { mutateAsync, data, isLoading, isSuccess } = useMutation<Data[]>(
    Sounder.GET_SPOTIFY_ARTIST,
    Sounder.getSpotifyArtist
  )
  const [artistId, setArtistId] = useState('')

  const {
    mutateAsync: selectArtist,
    data: artistMatch,
    isLoading: loadingAritistMatch
  } = useMutation(Sounder.POST_SPOTIFY_MATCH, Sounder.postSpotifyMatch)

  const onSubmit = useCallback(({ search }) => {
    mutateAsync(search)
  }, [])

  return (
    <Box mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="search"
            label="Artist name"
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
        {isSuccess &&
          !!data &&
          data.map(({ id, images, name, genres }) => (
            <Grid item xs={6} key={id}>
              <Card
                className={s.card}
                onClick={() => {
                  selectArtist({ genres, type: 'artist', id })
                  setArtistId(id)
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Avatar src={images?.[0]?.url} className={s.cardMedia} />
                    <Text>{name}</Text>

                    {artistId === id && (
                      <Box ml="auto" mr={2} paddingTop="7px">
                        {loadingAritistMatch ? (
                          <Loader />
                        ) : (
                          artistMatch &&
                          (artistMatch.recomend ? (
                            <FcCheckmark className={s.icon} />
                          ) : (
                            <FcCancel className={s.icon} />
                          ))
                        )}
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  )
}

export default ArtistSearchForm
