export { Ship, GameBoard };

class Ship {
  constructor(length) {
    (this.length = length), (this.hitNumber = 0), (this.sunk = false);
  }

  hits() {
    if (this.isSunk() === false) {
      this.hitNumber++;
      this.isSunk();
    }
  }

  isSunk() {
    if (this.hitNumber < this.length) {
      return false;
    } else {
      this.sunk = true;
      return true;
    }
  }
}

class GameBoard {
  constructor() {
    let matrix = [];

    for (let i = 0; i < 10; i++) {
      matrix.push([]);
    }

    matrix.forEach((array) => {
      for (let i = 0; i < 10; i++) {
        array.push([]);
      }
    });

    this.matrix = matrix;
    this.battleship = [];
    this.cruisers = [];
    this.destroyers = [];
    this.submarines = [];
  }

  placeShip(shipSize, x, y, orientation = 'h') {
    if (x + shipSize > 9 || y > 9 || x < 0 || y < 0) {
      return 'x- and y-coordinates should be in the range of 0 and 9';
    } else if (shipSize < 1 || shipSize > 4) {
      return 'Ship size should be in the range of 1 and 4';
    } else {
      let canPosition = true;
      let positionArray = [];

      for (let i = 0; i < shipSize; i++) {
        canPosition = checkPosition(this.matrix, i, x, y, shipSize);

        console.log(canPosition);

        if (canPosition === true) {
          positionArray.push(x + i);
        }
      }

      if (canPosition === true) {
        let ship = new Ship(shipSize);
        let shipClass;

        switch (shipSize) {
          case 1:
            if (this.submarines.length < 4) {
              this.submarines.push(ship);
              shipClass = 'submarines';
            }
            break;
          case 2:
            if (this.destroyers.length < 3) {
              this.destroyers.push(ship);
              shipClass = 'destroyers';
            }
            break;
          case 3:
            if (this.cruisers.length < 2) {
              this.cruisers.push(ship);
              shipClass = 'cruisers';
            }
            break;
          case 4:
            if (this.battleship < 1) {
              this.battleship.push(ship);
              shipClass = 'battleship';
            }
            break;
        }

        positionArray.forEach((element) => {
          this.matrix[y][element].push(shipClass);
          this.matrix[y][element].push(this[shipClass].length - 1);
        });
      }
    }
  }
}

function checkPosition(array, i, x, y, shipSize) {
  let position = true;

  if (y > 0 && y < 9 && x > 0 && x + shipSize < 9) {
    if (
      array[y][x - 1][0] !== undefined ||
      array[y][x + i][0] !== undefined ||
      array[y][x + shipSize][0] !== undefined ||
      array[y - 1][x - 1][0] !== undefined ||
      array[y - 1][x + i][0] !== undefined ||
      array[y - 1][x + shipSize][0] !== undefined ||
      array[y + 1][x + i][0] !== undefined ||
      array[y + 1][x - 1][0] !== undefined ||
      array[y + 1][x + shipSize][0] !== undefined
    ) {
      position = false;
    }
  } else if (y === 0 && x === 0) {
    if (
      array[y][x + i][0] !== undefined ||
      array[y][x + shipSize][0] !== undefined ||
      array[y + 1][x + i][0] !== undefined ||
      array[y + 1][x + shipSize][0] !== undefined
    ) {
      position = false;
    }
  } else if (y === 0 && x + shipSize === 9) {
    if (
      array[y][x - 1][0] !== undefined ||
      array[y][x + i][0] !== undefined ||
      array[y + 1][x - 1][0] !== undefined ||
      array[y + 1][x + i][0] !== undefined
    ) {
      position = false;
    }
  } else if (y === 9 && x === 0) {
    if (
      array[y][x + i][0] !== undefined ||
      array[y][x + shipSize][0] !== undefined ||
      array[y - 1][x + i][0] !== undefined ||
      array[y - 1][x + shipSize][0] !== undefined
    ) {
      position = false;
    }
  } else if (y === 9 && x + shipSize === 9) {
    if (
      array[y][x - 1][0] !== undefined ||
      array[y][x + i][0] !== undefined ||
      array[y - 1][x - 1][0] !== undefined ||
      array[y - 1][x + i][0] !== undefined
    ) {
      position = false;
    }
  } else if (y === 0 && x > 0 && x + shipSize < 9) {
    if (
      array[y][x - 1][0] !== undefined ||
      array[y][x + i][0] !== undefined ||
      array[y][x + shipSize][0] !== undefined ||
      array[y + 1][x - 1][0] !== undefined ||
      array[y + 1][x + i][0] !== undefined ||
      array[y + 1][x + shipSize][0] !== undefined
    ) {
      position = false;
    }
  } else if (y === 9 && x > 0 && x + shipSize < 9) {
    if (
      array[y][x - 1][0] !== undefined ||
      array[y][x + i][0] !== undefined ||
      array[y][x + shipSize][0] !== undefined ||
      array[y - 1][x - 1][0] !== undefined ||
      array[y - 1][x + i][0] !== undefined ||
      array[y - 1][x + shipSize][0] !== undefined
    ) {
      position = false;
    }
  }

  return position;
}
