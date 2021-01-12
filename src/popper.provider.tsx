import React, { FC, createContext, useState } from "react";
import ReactDOM from "react-dom";
import { PopperContainer } from "./popper.component";
import { randomIdGenerator } from "./popper.utils";
import { PrivatePopper, Popper, PopperManager, OpenFunc, CloseFunc} from './popper.intefaces'
import { Errors } from "./constants";

export const PopperContext = createContext<PopperManager | undefined>(
  undefined
);

export const PopperProvider: FC = ({ children }) => {
  const [poppers, setPoppers] = useState<PrivatePopper[]>([]);

  const open: OpenFunc = (element, options = {}) => {
    const {
      id: popperId = randomIdGenerator(),
      appendTo = document.body,
      onClose
    } = options;

    // Skip if the popper already exists
    if (poppers.find(({ id }) => id === popperId)) return;

    if (!appendTo) {
      throw new Error(Errors.appendToNotFound);
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
    setPoppers(oldPoppers => oldPoppers.filter(({ id }) => id !== popperId));
  };

  return (
    <PopperContext.Provider value={{ open, close }}>
      {children}
      {poppers.map(({ element, appendTo, id }) => (
        <React.Fragment key={`popper-portals-${id}`}>
          {ReactDOM.createPortal(<PopperContainer>{element}</PopperContainer>, appendTo)}
        </React.Fragment>
      ))}
    </PopperContext.Provider>
  );
};