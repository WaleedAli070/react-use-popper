import { ReactNode, useContext, useState } from "react";
import { PopperContext } from "./popper.provider";
import { getAnchorEl } from "./popper.utils";
import { CloseFunc, PopperOptions, ShowFunc, ToggleFunc } from './popper.intefaces'

export const usePopper = (defaultContent: ReactNode = 'Default Content', defaultOptions: PopperOptions = {}) => {
  const [popper, setPopper] = useState<any>(false)
  const [popperTarget, setPopperTarget] = useState<Element | null>(null)
  const [popperContent, setPopperContent] = useState<ReactNode | null>(null)
  const context = useContext(PopperContext);

  if (!context) {
    throw new Error("usePopper must be used within a PopperProvider");
  }

  const showPopper: ShowFunc = (event, content = defaultContent, options = defaultOptions) => {
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
    if (popperId !== popper.id) {
      throw new Error("unmatched popper ID");
    }
    context.close(popperId)
    setPopper(false)
    setPopperTarget(null)
    setPopperContent(null)
  }

  const togglePopper: ToggleFunc = (event: React.MouseEvent, content: ReactNode = defaultContent, options: any = defaultOptions) => {
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
  return { showPopper, hidePopper, togglePopper };
};