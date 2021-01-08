import React from 'react'

import { usePopper } from 'react-use-popper'
import 'react-use-popper/dist/index.css'

const ChidlComponent = () => {
  const { togglePopper, showPopper } = usePopper('Popper 1')
 
  const handleClick = (e: React.MouseEvent) => {
    togglePopper(e)
  }
  const handleAnotherClick = (e: React.MouseEvent) => {
    showPopper(e, 'Popper 2')
  }
  return (
    <>
      <button onClick={handleClick}>Testing Button</button>
      <button onClick={handleAnotherClick}>Another Testing Button</button>
    </>
  )
}

export default ChidlComponent
