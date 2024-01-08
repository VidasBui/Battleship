# Battleship Game in TypeScript (Node.js and React)

## Game rules

- The game follows the principle of "player against the computer," where the player guesses the positions of ships hidden by the program.
Ships are placed on a 10 x 10 board:
  ◦ 3 ships occupy 1 square;
  ◦ 3 ships occupy 2 squares;
  ◦ 2 ships occupy 3 squares;
  ◦ 1 ship occupies 4 squares;
  ◦ 1 ship occupies 5 squares.
- Ships can be placed vertically or horizontally (not diagonally).
- Ships must be placed in a way that there is at least one square between each ship. Ships cannot touch diagonally.
- Players try to guess which squares the program has hidden the ships in.
- The player selects one square at a time, and the program indicates whether the shot hit a part of the ship, sunk the entire ship, or missed completely.
- Players must see which squares have already been targeted, and they cannot shoot at the same square twice.
- Players have 25 shots. If a shot hits a ship, the shot is not counted. If a shot misses (does not hit a ship or its part), one shot is used.
- The player wins the game by sinking all the ships without using all 25 shots.
- The player loses the game if all 25 shots are used, and all the ships are not sunk.
- After the game ends, players can start a new game.

## Requirements for the program (code, structure, UI, etc.):

- The program must have 2 separate parts: a server (node.js) and a client (ReactJs).
- The client-side interacts with the server-side over the internet, and the communication protocol is not important (HTTP/JSON, Protobuf, etc.).
- Several clients can connect to the server simultaneously (i.e., multiple players can play from different computers at the same time).
- Each connected player plays their separate game.
- If the server part is disconnected, all ongoing games should be terminated; in other words, games should not be kept in persistent memory.
- The program's logic should be in the server part, and the client part should only handle visualization and command input.
- The client-side should work in popular modern browsers (Chrome, Firefox, or Edge).

## How to launch the game (using Visual Studio Code):

  1. Open Battlesip folder.
  2. Open Powershell.
  3. Change current dirrectory to server with command: `cd server`.
  4. Run `npm i` to install packages.
  5. Launch the server with command `npm start`.
  6. Open new powershell window.
  7. Change current dirrectory to client with command: `cd client`.
  8. Run `npm i` to install packages.
  9. Launch the client side with command `npm run start`.

## How to run tests (using Visual Studio Code):

  1. Open Battlesip folder.
  2. Open Powershell.
  3. Change current dirrectory to server with command: `cd server`.
  4. Run `npm i` to install packages (if you have not done already).
  5. Launch tests with command  `npm test`.
     
## Game screenshots:
![image](https://github.com/VidasBui/Battleship/assets/107630990/f4559ad6-aaa1-40aa-96a8-404db84ffdd6)
![image](https://github.com/VidasBui/Battleship/assets/107630990/faddc3b0-374e-4eeb-85fe-e5405b4f54c6)

## Additional notes:

I am using [Conventional Git messages](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)
