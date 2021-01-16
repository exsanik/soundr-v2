import { FC } from 'react'
import NextImage, { ImageProps } from 'next/image'
import { Box, BoxProps, createStyles, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(
  createStyles({
    root: {
      height: '100%',
      '& div': {
        height: '100%'
      }
    }
  }),
  { name: 'Image' }
)

type Props = Omit<ImageProps, 'width' | 'heigth'> & {
  wrapperProps?: BoxProps
}

const Image: FC<Props> = ({ wrapperProps, ...props }) => {
  const s = useStyles()

  return (
    <Box className={s.root} {...wrapperProps}>
      <NextImage {...props} height="100%" width="auto" />
    </Box>
  )
}

export default Image
