import React, { FC, createContext, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { PopperContainer } from "./popper.component";

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
) => PrivatePopper | undefined;

type CloseFunc = (popperId: string) => void;

export interface PopperManager {
  open: OpenFunc;
  close: CloseFunc;
}

export const PopperContext = createContext<PopperManager | undefined>(
  undefined
);

export const PopperProvider: FC = ({ children }) => {
  const [poppers, setPoppers] = useState<PrivatePopper[]>([]);
  const popperRefs = useRef(new Array())
  useEffect(() => {
    /* 
    * remove any null popperRefs. required because when we manually remove
    * from popperRefs array the poppers array creates a null ref in it, until
    * that item isn't removed (via setPoppers) from the popper array itself.
    */
    popperRefs.current = popperRefs.current.filter(ref => ref !== null)
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      poppers.map((popper, i) => {
        if (popperRefs.current[i] && !popperRefs.current[i].contains(event.target as Node)) {
          close(popper.id)
        }
      })
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [poppers]);

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

    return privatePopper
  };

  const close: CloseFunc = popperId => {
    const index = poppers.findIndex(({ id }) => id === popperId)
    setPoppers(oldPoppers => oldPoppers.filter(({ id }) => id !== popperId));
    popperRefs.current.splice(index, 1)
  };

  return (
    <PopperContext.Provider value={{ open, close }}>
      {children}
      {poppers.map(({ element, appendTo, id }) => (
        <React.Fragment key={id}>
          {ReactDOM.createPortal(<PopperContainer ref={(element) => popperRefs.current.push(element)}>{element}</PopperContainer>, appendTo)}
        </React.Fragment>
      ))}
    </PopperContext.Provider>
  );
};