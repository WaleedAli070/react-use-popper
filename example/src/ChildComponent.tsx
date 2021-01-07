import React, { ReactNode, useState } from 'react'

import { usePopper } from 'react-use-popper'
import 'react-use-popper/dist/index.css'

function getAnchorEl(anchorEl: ReactNode) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const ChidlComponent = () => {
  const { open, close } = usePopper()
  const [testingPopper, setTestingPopper] = useState<any>(false)
  const [anotherTestingPopper, setAnotherTestingPopper] = useState<any>(false)

  const handleClick = (e: React.MouseEvent) => {
    const anchorEl = getAnchorEl(e.currentTarget)
    if (testingPopper) {
      close(testingPopper.id)
      setTestingPopper(false)
      return
    }
    setTestingPopper(open('Testing', { id: 'testing-id', appendTo: anchorEl }))
  }
  const handleAnotherClick = (e: React.MouseEvent) => {
    const anchorEl = getAnchorEl(e.currentTarget)
    if (anotherTestingPopper) {
      close(anotherTestingPopper.id)
      setAnotherTestingPopper(false)
      return
    }
    setAnotherTestingPopper(open('Another Testing', { id: 'another-id', appendTo: anchorEl }))
  }
  return (
    <>
      <button onClick={handleClick}>Testing Button</button>
      <button onClick={handleAnotherClick}>Another Testing Button</button>
    </>
  )
}

export default ChidlComponent
