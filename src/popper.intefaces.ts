export interface Popper {
  close: () => void
}

export interface PrivatePopper {
  element: React.ReactNode
  id: string
  appendTo: Element
  placement?: string
}

export interface PopperOptions {
  id?: string
  appendTo?: Element
  placement?: string
  onClose?: () => void
  onError?: ErrorFunc
}

export interface OpenFunc {
  (
    element: ((popper: Popper) => React.ReactNode) | React.ReactNode,
    options?: PopperOptions
  ): PrivatePopper | undefined
}

export interface CloseFunc {
  (popperId: string): void
}

export interface ShowFunc {
  (
    event: React.MouseEvent,
    content?: ((popper: Popper) => React.ReactNode) | React.ReactNode,
    options?: PopperOptions
  ): PrivatePopper | undefined
}

export interface ToggleFunc {
  (
    event: React.MouseEvent,
    content?: ((popper: Popper) => React.ReactNode) | React.ReactNode,
    options?: PopperOptions
  ): void
}

export interface ErrorFunc {
  (err: Error): Error | void
}

export interface PopperManager {
  open: OpenFunc
  close: CloseFunc
}

export interface PopperArgs {
  defaultContent?: ((popper: Popper) => React.ReactNode) | React.ReactNode
  defaultOptions?: PopperOptions
}

export interface PopperHookReturns {
  togglePopper: ToggleFunc
  showPopper: ShowFunc
  hidePopper: CloseFunc
}

export interface UsePopperHook {
  (
    defaultContent?: ((popper: Popper) => React.ReactNode) | React.ReactNode,
    defaultOptions?: PopperOptions
  ): PopperHookReturns
}

export interface PopperContainerProps {
  appendTo: Element
  placement?: string
}
