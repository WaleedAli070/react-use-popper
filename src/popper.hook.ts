import { useContext } from "react";
import { PopperContext } from "./popper.provider";

export const usePopper = () => {
  const context = useContext(PopperContext);

  if (!context) {
    throw new Error("usePopper must be used within a PopperProvider");
  }

  return context;
};