import { createContext, Dispatch, SetStateAction } from "react";
import { DirectionProps } from "../types/DirectionProps";
import { LocationProps } from "../types/LocationProps";

// Defining the props for the global states that will be managed
interface RobotContextProps {
  robotLocation: LocationProps;
  setRobotLocation: Dispatch<SetStateAction<LocationProps>>;
  robotDirection: DirectionProps;
  setRobotDirection: Dispatch<SetStateAction<DirectionProps>>;
}

// Create an initial context
export const RobotContext = createContext<RobotContextProps | undefined>(undefined);