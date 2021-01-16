import { FC, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router'
import { useQueryClient } from 'react-query'

import LocalStorageEnum from '~/constants/LocalStorage'
import Sounder from '~/services/sounder'
import { Loader } from '~/components/shared'

const Token: FC = () => {
  const router = useRouter()
  const { token } = router.query
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!!token && typeof token === 'string') {
      router.push('/profile')
      localStorage.setItem(LocalStorageEnum.ACCESS_TOKEN, token)
      Sounder.setAuthToken(token)
      queryClient.refetchQueries(Sounder.GET_USER_ME)
    } else {
      router.push('/')
    }
  }, [token])

  return <Loader />
}

export default Token
