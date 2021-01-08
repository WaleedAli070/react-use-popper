export interface Popper {
  close: () => void;
}

export interface PrivatePopper {
  element: React.ReactNode;
  id: string;
  appendTo: Element;
}

export interface PopperOptions {
  id?: string;
  appendTo?: Element;
  onClose?: () => void;
}

export type OpenFunc = (
  element: ((popper: Popper) => React.ReactNode) | React.ReactNode,
  options?: PopperOptions
) => PrivatePopper | undefined;

export type CloseFunc = (popperId: string) => void;

export type ShowFunc = (
  event: React.MouseEvent,
  content?: ((popper: Popper) => React.ReactNode) | React.ReactNode,
  options?: PopperOptions
) => PrivatePopper | undefined;

export type ToggleFunc = (
  event: React.MouseEvent,
  content?: ((popper: Popper) => React.ReactNode) | React.ReactNode,
  options?: PopperOptions
) => void;

export interface PopperManager {
  open: OpenFunc;
  close: CloseFunc;
}