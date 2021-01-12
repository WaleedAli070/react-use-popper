import { render } from '@testing-library/react'
import React, { ReactNode } from 'react'
import { Default_Hook_Content } from './constants'
import { usePopper } from './popper.hook'
import { PopperHookReturns } from './popper.intefaces'
import { PopperProvider } from './popper.provider'

export const TestHookWithoutContext = () => {
  usePopper()
  return (
    <div>This component is using popper hook without popper provider</div>
  )
}

export const TestHookWithContext = (popperContent: ReactNode = Default_Hook_Content, hookHandler: string = 'togglePopper', handlerArgs: any[] = []) => {
  const returnVal: PopperHookReturns | any = {}
  function TestComponentUsingHook() {
    Object.assign(returnVal, usePopper(popperContent))
    return <button onClick={(e) => returnVal[hookHandler](e, ...handlerArgs)}>Dummy Button</button>
  }
  render(
    <PopperProvider>
      <TestComponentUsingHook />
    </PopperProvider>
  )
  return returnVal
}