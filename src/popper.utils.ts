import { ReactNode } from 'react'

export const randomIdGenerator = (prefix: string = 'popper-') => {
  return `${prefix}${
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  }`
}

export const getAnchorEl = (anchorEl: ReactNode) => {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl
}

export const computePopperPosition = (
  reference: ClientRect,
  contentNode: ClientRect
) => {
  const canOpenAbove =
    reference.top + reference.height * 2 >
      (window.document.documentElement || window.document.body).clientHeight &&
    reference.top - reference.height > 0

  const top = canOpenAbove
    ? reference.top - contentNode.height + window.scrollY
    : reference.top + reference.height + window.scrollY

  const canAlignRight =
    reference.left + contentNode.width >
      (window.document.documentElement || window.document.body).clientWidth &&
    reference.left - contentNode.width > 0

  const left = !canAlignRight
    ? reference.left + window.scrollX
    : window.scrollX + reference.left - contentNode.width + reference.width

  return {
    left: Math.ceil(left),
    top: Math.ceil(top)
  }
}
