import { useContext } from "react";
import { Grid, Box } from "@mui/material";
import { RobotContext } from "../../globalStates/RobotContext.ts";
import { LocationProps } from "../../types/LocationProps.ts";

const Cell = ({ row, column }: LocationProps) => {
  const context = useContext(RobotContext);
  const location = context?.robotLocation;
  const setLocation = context?.setRobotLocation;
  const direction = context?.robotDirection;
  const isRobotHere = location?.row === row && location?.column === column;

  const onClick = () => {
    if (!setLocation) {
      throw new Error("useRobotContext must be used within a RobotProvider");
    }
    setLocation({
      row: row,
      column: column,
    });
  };

  const getDirection = () => {
    switch (direction) {
      case "NORTH":
        return "rotate(0deg)";
      case "EAST":
        return "rotate(90deg)";
      case "SOUTH":
        return "rotate(180deg)";
      case "WEST":
        return "rotate(270deg)";
      default:
        return "rotate(0deg)";
    }
  };

  const getBackgroundColor = (column: number): string => {
    if ((row + column) % 2 === 0) {
      return "black";
    }
    return "white";
  };

  return (
    <Grid
      item
      xs={12 / 5}
      key={`${row}, ${column}`}
      style={{ display: "flex" }}
    >
      <Box
        style={{
          height: "100px",
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: getBackgroundColor(column),
        }}
        onClick={() => onClick()}
      >
        {isRobotHere && (
          <p
            style={{
              fontSize: "30px",
              width: "fit-content",
              transform: getDirection(),
            }}
          >
            🤖
          </p>
        )}
      </Box>
    </Grid>
  );
};

export default Cell;
