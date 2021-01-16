import { FC } from 'react'

import { Box, createStyles, makeStyles } from '@material-ui/core'

import Text from '~/components/shared/Text'
import { Link } from '~/components/shared'

const useStyles = makeStyles(
  theme =>
    createStyles({
      root: {
        display: 'flex',
        height: 36,
        width: '100%',
        alignItems: 'center',
        borderTop: `2px solid ${theme.palette.primary.dark}`,
        backgroundColor: theme.palette.background.default
      }
    }),
  { name: 'Footer' }
)

const Footer: FC = () => {
  const s = useStyles()

  return (
    <Box className={s.root}>
      <Text ml={4} font="mono">
        Made by{' '}
        <Link
          href="https://github.com/exsanik"
          linkProps={{ underline: 'always' }}
        >
          @exsanik
        </Link>{' '}
        with ❤️
      </Text>
    </Box>
  )
}

export default Footer
