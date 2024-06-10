import { createContext, Dispatch, SetStateAction } from "react";
import { DirectionProps } from "../types/DirectionProps";
import { LocationProps } from "../types/LocationProps";

// Defining the props for the global states that will be managed by one single RobotContext
interface RobotContextProps {
  robotLocation: LocationProps;
  setRobotLocation: Dispatch<SetStateAction<LocationProps>>;
  robotDirection: DirectionProps;
  setRobotDirection: Dispatch<SetStateAction<DirectionProps>>;
}

// Create an initial context -- I did need to check w chatGPT how to type context
// I've usually used Redux for global stores, but felt that was overkill for this project
export const RobotContext = createContext<RobotContextProps | undefined>(undefined);