import { FC } from 'react'
import NextLink, { LinkProps } from 'next/link'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core'

type Props = LinkProps & {
  className?: string
  linkProps?: MuiLinkProps
}

const Link: FC<Props> = ({ children, linkProps, ...props }) => {
  return (
    <NextLink passHref {...props}>
      <MuiLink underline="none" {...linkProps}>
        {children}
      </MuiLink>
    </NextLink>
  )
}

export default Link
