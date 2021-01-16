import { ComponentsProps } from '@material-ui/core/styles/props'

const overridesProps: ComponentsProps = {
  MuiButton: {
    variant: 'contained'
  },
  MuiLink: {
    color: 'textPrimary'
  },
  MuiExpansionPanel: {
    square: true
  }
}

export default overridesProps
