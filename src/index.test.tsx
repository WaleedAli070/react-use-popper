import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { PopperProvider } from '.'
import {
  TestHookWithoutContext,
  TestHookWithContext,
  TestChildrenRenderInProvider
} from './popper.testUtils'

describe('Popper Provider', () => {
  it('is truthy', () => {
    expect(PopperProvider).toBeTruthy()
  })

  it('renders children inside', () => {
    TestChildrenRenderInProvider('Testing Children')
    expect(screen.getByText(/^Testing/)).toBeTruthy()
  })
})

describe('usePopper Hook', () => {
  it('throws error if not used inside of popper context', () => {
    const errorObject = console.error // in order to remove the expected exception from console,
    console.error = jest.fn() // we will mock the console error object
    expect(() => {
      render(<TestHookWithoutContext />)
    }).toThrow()
    console.error = errorObject
  })

  it('works fine with context', () => {
    expect(TestHookWithContext()).toBeTruthy()
  })

  it('exposes toggle, show, and hide callbacks', () => {
    const popper = TestHookWithContext()
    expect(popper).toHaveProperty('togglePopper')
    expect(popper).toHaveProperty('showPopper')
    expect(popper).toHaveProperty('hidePopper')
  })

  it('togglePopper toggles popper content on click event', () => {
    TestHookWithContext('Toggle Popper Content')
    fireEvent.click(screen.getByText('Dummy Button'))
    expect(screen.getByText(/^Toggle Popper Content/)).toBeTruthy()
    fireEvent.click(screen.getByText('Dummy Button'))
    expect(screen.findByText(/^Toggle Popper Content/)).toMatchObject({})
  })

  it('showPopper renders popper content on click event', () => {
    TestHookWithContext('Show Popper Content', 'showPopper')
    fireEvent.click(screen.getByText('Dummy Button'))
    expect(screen.getByText(/^Show Popper Content/)).toBeTruthy()
    fireEvent.click(screen.getByText('Dummy Button'))
  })

  it('hidePopper returns an error if popper with provided id is not found', () => {
    const popper = TestHookWithContext('Show Popper Content', 'hidePopper', [
      'randomId'
    ])
    expect(() => popper.hidePopper('asd')).toThrow()
  })
})
