import React from 'react'
import { styled, Typography, TypographyProps } from '@material-ui/core'
import {
  flexbox,
  compose,
  typography,
  display,
  spacing,
  ComposedStyleFunction,
  PropsFor
} from '@material-ui/system'

import { opacity, textTransform, whiteSpace } from '~/theme/styleProps'

type TextStyleFunction = ComposedStyleFunction<
  [
    typeof spacing,
    typeof typography,
    typeof flexbox,
    typeof display,
    typeof textTransform,
    typeof opacity,
    typeof whiteSpace
  ]
>

type SystemProps = PropsFor<TextStyleFunction>
type ElementProps = Omit<React.HTMLAttributes<HTMLElement>, keyof SystemProps>

export interface TextProps extends ElementProps, SystemProps {
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
  font?: 'mono' | 'default'
}

const font = (props: TextProps) => ({
  fontFamily: props.font === 'mono' ? 'DM Mono, monospace' : undefined
})

const Text: React.ComponentType<TypographyProps | TextProps> = styled(
  Typography
)(
  compose(
    spacing,
    display,
    typography,
    flexbox,
    opacity,
    textTransform,
    whiteSpace,
    font
  ),
  {
    name: 'Text'
  }
)

export default Text
