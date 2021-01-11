import { render } from '@testing-library/react'
import React from 'react'
import { usePopper } from './popper.hook'
import { PopperProvider } from './popper.provider'

const TestComponentUsingHook = ({ callback }: { callback: Function }) => {
  callback()
  return null
}

export const TestHookWithoutContext = () => {
  usePopper()
  return (
    <div>This component is using popper hook without popper provider</div>
  )
}

export const TestHookWithContext = (callback: Function) => {
  return render(
    <PopperProvider>
      <TestComponentUsingHook callback={callback} />
    </PopperProvider>
  )
}