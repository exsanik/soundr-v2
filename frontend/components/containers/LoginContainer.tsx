import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useRouter } from 'next/dist/client/router'

import { useSnackbar } from 'material-ui-snackbar-provider'
import { Loader } from '~/components/shared'

import Sounder from '~/services/sounder'
import LocalStorageEnum from '~/constants/LocalStorage'

type Props = {
  children: JSX.Element
}

const unloggedUrls = ['/', '/token']
const loggedUrls = ['/dashboard', '/profile']

const LoginContainer = ({ children }: Props): JSX.Element => {
  const { push, pathname } = useRouter()
  const snackbar = useSnackbar()
  const [wrongLocation, setWrongLocation] = useState(false)

  const { isLoading, isSuccess, data, isIdle, refetch } = useQuery(
    Sounder.GET_USER_ME,
    Sounder.getUserMe,
    {
      enabled: false,
      refetchOnWindowFocus: false,
      retry: false,
      onError: () => {
        push('/')
      }
    }
  )

  useEffect(() => {
    const token = localStorage.getItem(LocalStorageEnum.ACCESS_TOKEN)
    if (token) {
      Sounder.setAuthToken(token)
    } else {
      Sounder.setAuthToken('')
    }
    refetch()
  }, [])

  useEffect(() => {
    if (isSuccess && data?.access_token) {
      if (unloggedUrls.find(path => path === pathname)) {
        setWrongLocation(true)
        push('/dashboard').then(() => {
          setWrongLocation(false)
        })
      }
    } else if (isSuccess && !data) {
      if (loggedUrls.find(path => path === pathname)) {
        setWrongLocation(true)
        push('/').then(() => {
          setWrongLocation(false)
        })
      }
    }
  }, [pathname, data, isSuccess])

  if (isLoading || isIdle || wrongLocation) return <Loader />

  return children
}

export default LoginContainer
