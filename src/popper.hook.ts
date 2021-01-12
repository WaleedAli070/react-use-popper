import { ReactNode, useContext, useState } from 'react'
import { PopperContext } from './popper.provider'
import { getAnchorEl } from './popper.utils'
import {
  CloseFunc,
  PopperOptions,
  ShowFunc,
  ToggleFunc,
  UsePopperHook
} from './popper.intefaces'
import { Default_Hook_Content, Default_Hook_Options, Errors } from './constants'

export const usePopper: UsePopperHook = (
  defaultContent: ReactNode = Default_Hook_Content,
  defaultOptions: PopperOptions = Default_Hook_Options
) => {
  const [popper, setPopper] = useState<any>(false)
  const [popperTarget, setPopperTarget] = useState<Element | null>(null)
  const [popperContent, setPopperContent] = useState<ReactNode | null>(null)
  const context = useContext(PopperContext)
  if (!context) {
    const error = new Error(Errors.providerNotFound)
    defaultOptions.onError && defaultOptions.onError(error)
    throw error
  }

  const showPopper: ShowFunc = (
    event,
    content = defaultContent,
    options = defaultOptions
  ) => {
    if (popper) {
      hidePopper(popper.id)
    }
    const appendTo = getAnchorEl(event.currentTarget)
    const newPopper = context?.open(content, { appendTo, ...options })
    setPopper(newPopper)
    setPopperTarget(appendTo)
    setPopperContent(content)
    return newPopper
  }

  const hidePopper: CloseFunc = (popperId) => {
    if (!popper || popperId !== popper.id) {
      const error = new Error(Errors.unmatchedID)
      defaultOptions.onError && defaultOptions.onError(error)
      throw error
    }
    context.close(popperId)
    setPopper(false)
    setPopperTarget(null)
    setPopperContent(null)
  }

  const togglePopper: ToggleFunc = (
    event: React.MouseEvent,
    content: ReactNode = defaultContent,
    options: PopperOptions = defaultOptions
  ) => {
    const appendTo = getAnchorEl(event.currentTarget)
    const isTargetChanged = appendTo !== popperTarget
    const isContentChanged = content !== popperContent
    if (popper) {
      hidePopper(popper.id)
    }
    if (!popper || isTargetChanged || isContentChanged) {
      showPopper(event, content, options)
    }
  }
  return { showPopper, hidePopper, togglePopper }
}
