import { useCallback, useEffect, useState } from "react";
import { Button, ButtonGroup, Grid } from "@mui/material";
import "./MatrixContainer.css";
import Cell from "../Cell/Cell";
import { RobotContext } from "../../globalStates/RobotContext";
import { DirectionProps } from "../../types/DirectionProps";
import { LocationProps } from "../../types/LocationProps";

const MatrixContainer = () => {
  // initalizing robot to off the board
  const initRobot: LocationProps = {
    row: -1,
    column: -1,
  };

  // establishing global states
  const [robotLocation, setRobotLocation] = useState(initRobot);
  const [robotDirection, setRobotDirection] = useState(DirectionProps.NORTH);
  const [message, setMessage] = useState("");

  const isRobotOnBoard =
    robotLocation.row !== -1 && robotLocation.column !== -1;

  // rotation functions
  const handleRotateLeft = useCallback((direction: DirectionProps) => {
    switch (direction) {
      case "NORTH":
        setRobotDirection(DirectionProps.WEST);
        break;
      case "EAST":
        setRobotDirection(DirectionProps.NORTH);
        break;
      case "SOUTH":
        setRobotDirection(DirectionProps.EAST);
        break;
      case "WEST":
        setRobotDirection(DirectionProps.SOUTH);
        break;
      default:
        setRobotDirection(DirectionProps.WEST);
        break;
    }
  }, []);

  const handleRotateRight = useCallback((direction: DirectionProps) => {
    switch (direction) {
      case "NORTH":
        setRobotDirection(DirectionProps.EAST);
        break;
      case "EAST":
        setRobotDirection(DirectionProps.SOUTH);
        break;
      case "SOUTH":
        setRobotDirection(DirectionProps.WEST);
        break;
      case "WEST":
        setRobotDirection(DirectionProps.NORTH);
        break;
      default:
        setRobotDirection(DirectionProps.EAST);
        break;
    }
  }, []);

  // extra function to set the direction based on the cardinal directions (n, s, w, e) input
  const handleResetDirection = useCallback((direction: string) => {
    switch (direction) {
      case "n":
        setRobotDirection(DirectionProps.NORTH);
        break;
      case "s":
        setRobotDirection(DirectionProps.SOUTH);
        break;
      case "e":
        setRobotDirection(DirectionProps.EAST);
        break;
      case "w":
        setRobotDirection(DirectionProps.WEST);
        break;
    }
  }, []);

  // displays the (x, y) location and direction of the robot
  const handleReport = (location: LocationProps, direction: DirectionProps) => {
    if (location.row !== -1 && location.column !== -1) {
      setMessage(
        `Your robot is located at (${location.row}, ${location.column}) and is facing ${direction}`
      );
    }
  };

  // moves the robot in the direction it is facing
  const handleMoveForwards = useCallback(
    (location: LocationProps, direction: DirectionProps) => {
      switch (direction) {
        case "NORTH":
          if (location.row === 4) {
            setMessage("You can't move here!");
            break;
          }
          if (isRobotOnBoard) {
            setRobotLocation({
              row: location.row + 1,
              column: location.column,
            });
          }
          break;
        case "SOUTH":
          if (location.row === 0) {
            setMessage("You can't move here!");
            break;
          }
          if (isRobotOnBoard) {
            setRobotLocation({
              row: location.row - 1,
              column: location.column,
            });
          }
          break;
        case "EAST":
          if (location.column === 4) {
            setMessage("You can't move here!");
            break;
          }
          if (isRobotOnBoard) {
            setRobotLocation({
              row: location.row,
              column: location.column + 1,
            });
          }
          break;
        case "WEST":
          if (location.column === 0) {
            setMessage("You can't move here!");
            break;
          }
          if (isRobotOnBoard) {
            setRobotLocation({
              row: location.row,
              column: location.column - 1,
            });
          }
          break;
      }
    },
    [isRobotOnBoard]
  );

  // moves the robot in the opposite direction it is facing
  const handleMoveBackwards = useCallback(
    (location: LocationProps, direction: DirectionProps) => {
      switch (direction) {
        case "NORTH":
          if (location.row === 0) {
            setMessage("You can't move here!");
            break;
          }
          if (isRobotOnBoard) {
            setRobotLocation({
              row: location.row - 1,
              column: location.column,
            });
          }
          break;
        case "SOUTH":
          if (location.row === 4) {
            setMessage("You can't move here!");
            break;
          }
          if (isRobotOnBoard) {
            setRobotLocation({
              row: location.row + 1,
              column: location.column,
            });
          }
          break;
        case "EAST":
          if (location.column === 0) {
            setMessage("You can't move here!");
            break;
          }
          if (isRobotOnBoard) {
            setRobotLocation({
              row: location.row,
              column: location.column - 1,
            });
          }
          break;
        case "WEST":
          if (location.column === 4) {
            setMessage("You can't move here!");
            break;
          }
          if (isRobotOnBoard) {
            setRobotLocation({
              row: location.row,
              column: location.column + 1,
            });
          }
          break;
      }
    },
    [isRobotOnBoard]
  );

  useEffect(() => {
    // if the robot is on yet on the board, instruct the user how to place one there
    if (!isRobotOnBoard) {
      setMessage("Click on a tile to place your robot");
    }
    if (isRobotOnBoard) {
      setMessage("");
    }

    // continously check for key presses to control robot moves
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handleRotateLeft(robotDirection);
      }
      if (event.key === "ArrowRight") {
        handleRotateRight(robotDirection);
      }
      const resetDirection = ["n", "s", "e", "w"];
      if (resetDirection.includes(event.key)) {
        handleResetDirection(event.key);
      }
      if (event.key === "ArrowUp") {
        handleMoveForwards(robotLocation, robotDirection);
      }
      if (event.key === "ArrowDown") {
        handleMoveBackwards(robotLocation, robotDirection);
      }
    };
    document.addEventListener("keydown", keyDownHandler);

    // clean up and remove the event listener to reduce rerendering
    return () => {
      setMessage("");
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [
    robotDirection,
    robotLocation,
    handleRotateLeft,
    handleRotateRight,
    handleResetDirection,
    handleMoveBackwards,
    handleMoveForwards,
    isRobotOnBoard,
  ]);

  // set up the initial grid by plotting over 2 arrays
  // for each column in a row, all a cell to the grid
  const grid = [];
  for (let row = 4; row >= 0; row--) {
    const columns = [];
    for (let column = 0; column < 5; column++) {
      columns.push(<Cell key={column} row={row} column={column} />);
    }
    grid.push(
      <Grid container item xs={12} key={row}>
        {columns}
      </Grid>
    );
  }

  return (
    <RobotContext.Provider
      value={{
        robotLocation,
        setRobotLocation,
        robotDirection,
        setRobotDirection,
      }}
    >
      <div className="full-board--container">
        {/* display all button options for all the available functions */}
        <ButtonGroup sx={{ mb: 2 }}>
          <Button
            onClick={() => handleMoveForwards(robotLocation, robotDirection)}
          >
            Move Forwards
          </Button>
          <Button
            onClick={() => handleMoveBackwards(robotLocation, robotDirection)}
          >
            Move Backwards
          </Button>
          <Button
            onClick={() => {
              handleRotateLeft(robotDirection);
            }}
          >
            Rotate Left
          </Button>
          <Button
            onClick={() => {
              handleRotateRight(robotDirection);
            }}
          >
            Rotate Right
          </Button>
          <Button
            onClick={() => handleReport(robotLocation, robotDirection)}
            onBlur={() => {
              setMessage("");
            }}
          >
            Report
          </Button>
        </ButtonGroup>
        {/* Optional message with set height so the page doesn't jump */}
        <p style={{ height: "20px" }}>{message}</p>
        <div className="matrix--container">
          <Grid container spacing={0} border={"1px solid black"}>
            {grid}
          </Grid>
        </div>
      </div>
    </RobotContext.Provider>
  );
};

export default MatrixContainer;
