import {
  createContext,
  FC,
  useContext,
  useState,
  Dispatch,
  SetStateAction
} from 'react'

export type ContextValue = { backgroundSrc: string }

type LayoutContextValues = {
  setPageStyles: Dispatch<SetStateAction<ContextValue>>
  pageStyles: ContextValue
}

const MainLayoutContext = createContext<LayoutContextValues>(
  {} as LayoutContextValues
)

const MainLayoutContextProvider: FC = ({ children }) => {
  const [pageStyles, setPageStyles] = useState<ContextValue>({
    backgroundSrc: ''
  })

  return (
    <MainLayoutContext.Provider value={{ setPageStyles, pageStyles }}>
      {children}
    </MainLayoutContext.Provider>
  )
}

export const useLayoutContext = () => useContext(MainLayoutContext)

export default MainLayoutContextProvider
