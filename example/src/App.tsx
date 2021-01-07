import React from 'react'

import { PopperProvider } from 'react-use-popper'
import 'react-use-popper/dist/index.css'
import ChidlComponent from './ChildComponent'

const App = () => {
  return (
    <>
      <PopperProvider>
        <ChidlComponent />
      </PopperProvider>
    </>
  )
}

export default App
