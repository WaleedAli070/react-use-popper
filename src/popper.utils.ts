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
