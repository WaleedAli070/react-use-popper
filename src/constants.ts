import { PopperOptions } from './popper.intefaces'

export const Default_Hook_Options: PopperOptions = {
  onError: (err) => {
    throw err
  }
}

export const Default_Hook_Content: string = 'Default Content'

export const Errors = {
  providerNotFound: 'usePopper must be used within a PopperProvider',
  unmatchedID: 'unmatched popper ID',
  appendToNotFound: 'Trying to open a popper in a nonexistent DOM node'
}
