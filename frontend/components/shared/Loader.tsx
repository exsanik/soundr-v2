import { FC } from 'react'
import { Box, BoxProps, CircularProgress } from '@material-ui/core'

const Loader: FC<BoxProps> = props => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loader
