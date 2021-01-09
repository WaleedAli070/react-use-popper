import { render } from '@testing-library/react'
import React from 'react'
import { usePopper } from './popper.hook'

const TestHook = ({ callback }: { callback: Function }) => {
    callback()
    return null
}

export const TestHookWithoutContext = () => {
    usePopper()
    return (
        <div>This component is using popper hook without popper provider</div>
    )
}

export const testPopperHook = (callback: Function) => {
   return render(<TestHook callback={callback} />)
}