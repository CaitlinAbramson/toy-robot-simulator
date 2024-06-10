## toy-robot-simulator
This application simulates a toy robot moving on a 5x5 square tabletop.

## Set Up
Clone the repo and run `npm i` -- all your necessary dependencies should be installed here.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Actions
* **Rotate Left**: you can either use the button or your left arrow key
* **Rotate Right**: you can either use the button or your right arrow key
* **Move Forwards**: you can either use the button or the up arrow key
* **Move Backwards**: you can either use the button or the down arrow key
* **Report**: use the button to view text that displays your robot's location on the board and direction
* **Face North**: use the "n" key
* **Face South**: use the "s" key
* **Face West**: use the "w" key
* **Face East**: use the "e" key

## Testing
* Click anywhere on the board to place to robot in an initial tile. You should not be able to place the robot outside of the board. If you click outside, nothing will happen.
* If you already have your robot placed, you may still click on any tile to place to robot on a new tile.
* Should you try to move off the board (your robot is at an edge and you move forwards or backwards in a direction that would be off), you will see a message that you cannot move there. Your robot will stay in place.
