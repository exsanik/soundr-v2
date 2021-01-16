import React from 'react'
import {
  styled,
  Button as MuiButton,
  ButtonProps,
  CircularProgress
} from '@material-ui/core'
import {
  compose,
  typography,
  spacing,
  ComposedStyleFunction,
  PropsFor
} from '@material-ui/system'

type ButtonStyleFunction = ComposedStyleFunction<
  [typeof spacing, typeof typography]
>

type SystemProps = PropsFor<ButtonStyleFunction>
type ElementProps = Omit<React.HTMLAttributes<HTMLElement>, keyof SystemProps>

export interface ButtonCustomProps extends ElementProps, SystemProps {
  component?: React.ElementType
  clone?: boolean
  css?: SystemProps
  color?:
    | 'inherit'
    | 'initial'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error'
    | undefined
  loading?: boolean
}

const Button: React.ComponentType<(ButtonProps | ButtonProps) &
  ButtonCustomProps> = styled(({ loading, children, ...props }) => (
  <MuiButton {...props}>
    {loading ? <CircularProgress color="inherit" size={26} /> : children}
  </MuiButton>
))(compose(spacing, typography), {
  name: 'Button'
})

export default Button
