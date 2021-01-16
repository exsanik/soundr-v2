import { PaletteOptions } from '@material-ui/core/styles/createPalette'
import { lighten } from '@material-ui/core/styles'

interface PaletteType extends PaletteOptions {
  custom: {
    border: string
  }
}

const palette: PaletteType = {
  type: 'dark',
  primary: {
    main: '#FDE617',
    dark: '#4A4622'
  },
  secondary: {
    main: '#1ED760',
    light: '#CCCCCC'
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#555661',
    disabled: 'rgba(0, 0, 0, .23)',
    hint: '#8C8E9D'
  },
  custom: {
    border: '#CBD0D5'
  },
  background: {
    default: '#1D1E25'
  }
}

export default palette
