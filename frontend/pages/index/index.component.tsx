import { FC, useEffect } from 'react'

import SpotifyButton from './components/SpotifyButton'
import { useLayoutContext } from '~/components/layouts/MainLayout/MainLayout.context'

import wavesSrc from '~/public/images/index_wave.png'

const Home: FC = () => {
  const { setPageStyles } = useLayoutContext()

  useEffect(() => {
    setPageStyles({ backgroundSrc: wavesSrc })

    return () => {
      setPageStyles({ backgroundSrc: '' })
    }
  }, [])

  return <SpotifyButton />
}

export default Home
