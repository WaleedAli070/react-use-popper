import React from 'react'

import { usePopper } from 'react-use-popper'
import 'react-use-popper/dist/index.css'

const ChidlComponent = () => {
  const { open } = usePopper()

  const handleClick = () => {
    open('Testing', { id: 'testing-id' })
  }
  const handleAnotherClick = () => {
    open('Another Testing', { id: 'another-id' })
  }
  return (
    <>
        <button onClick={handleClick}>Testing Button</button>
        <button onClick={handleAnotherClick}>Another Testing Button</button>
    </>
  )
}

export default ChidlComponent
