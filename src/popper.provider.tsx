import React, { FC, createContext, useState } from "react";
import ReactDOM from "react-dom";

export interface Popper {
  close: () => void;
}

interface PrivatePopper {
  element: React.ReactNode;
  id: string;
  appendTo: Element;
}

interface OpenOptions {
  id?: string;
  appendTo?: Element;
  onClose?: () => void;
}

type OpenFunc = (
  element: ((popper: Popper) => React.ReactNode) | React.ReactNode,
  options?: OpenOptions
) => void;

type CloseFunc = (popperId: string) => void;

export interface PopperManager {
  open: OpenFunc;
}

export const PopperContext = createContext<PopperManager | undefined>(
  undefined
);

export const PopperProvider: FC = ({ children }) => {
  const [poppers, setPoppers] = useState<PrivatePopper[]>([]);

  const open: OpenFunc = (element, options = {}) => {
    const {
      id: popperId = 'default-popper-id',
      appendTo = document.body,
      onClose
    } = options;

    // Skip if the popper already exists
    if (poppers.find(({ id }) => id === popperId)) return;

    if (!appendTo) {
      throw new Error("Trying to open a popper in a nonexistent DOM node");
    }

    const popper: Popper = {
      close: () => {
        close(popperId);
        onClose?.();
      }
    };

    const popperElement =
      typeof element === "function" ? element(popper) : element;

    const privatePopper: PrivatePopper = {
      element: popperElement,
      id: popperId,
      appendTo
    };

    setPoppers(oldPoppers => [...oldPoppers, privatePopper]);
  };

  const close: CloseFunc = popperId => {
    setPoppers(oldPoppers => oldPoppers.filter(({ id }) => id !== popperId));
  };

  return (
    <PopperContext.Provider value={{ open }}>
      {children}
      {poppers.map(({ element, appendTo, id }) => (
        <React.Fragment key={id}>
          {ReactDOM.createPortal(element, appendTo)}
        </React.Fragment>
      ))}
    </PopperContext.Provider>
  );
};