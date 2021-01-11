import React from 'react'
import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { PopperProvider } from '.'
import { TestHookWithoutContext, TestHookWithContext } from './popper.testUtils'
import { usePopper } from './popper.hook'

const renderChildrenInProvider = (child: ReactNode) => {
  return render(
    <PopperProvider>{child}</PopperProvider>
  )
}


describe('Popper Provider', () => {
  it('is truthy', () => {
    expect(PopperProvider).toBeTruthy()
  })
  it('renders children inside', () => {
    renderChildrenInProvider('Testing Children')
    expect(screen.getByText(/^Testing/)).toBeTruthy()
  })
})

describe('usePopper Hook', () => {
  it('throws error if not used inside of popper context', () => {
    expect(() => {
      render(<TestHookWithoutContext />)
    }).toThrow()
  })
  it('works fine with context', () => {
    expect(TestHookWithContext(usePopper))
  })
})