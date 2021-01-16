import { createMuiTheme } from '@material-ui/core'
import { TypographyOptions } from '@material-ui/core/styles/createTypography'

const defaultTheme = createMuiTheme()

const typography: TypographyOptions = {
  fontFamily: 'Roboto, sans-serif',
  h1: {
    fontSize: 60,
    fontWeight: 500,

    [defaultTheme.breakpoints.down('xs')]: {
      fontSize: 48
    }
  },
  h2: {
    fontSize: 34,
    fontWeight: 500
  },
  h3: {
    fontSize: 24,
    fontWeight: 500
  },
  h4: {
    fontSize: 20,
    fontWeight: 500
  },
  h5: {
    fontSize: 20
  },
  subtitle1: {
    fontSize: 18,
    lineHeight: 1.7
  },
  body1: {
    fontSize: 16,
    lineHeight: 1.65
  },
  body2: {
    fontSize: 16,
    lineHeight: 1.5,
    marginBottom: 10
  },
  caption: {
    fontSize: 14,
    lineHeight: 1.15
  }
}

export default typography
