import { createMuiTheme } from '@material-ui/core/styles'

import palette from './palette'
import typography from './typography'
import overrides from './overrides'
import props from './overridesProps'

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 894,
      lg: 1280,
      xl: 1440
    }
  },
  palette,
  typography,
  overrides,
  props
})

export default theme
