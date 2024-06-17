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

    for (let i = 0; i < 12; i++) {
      matrix.push([]);
    }

    matrix.forEach((array) => {
      for (let i = 0; i < 12; i++) {
        array.push([]);
      }
    });

    this.matrix = matrix;
    this.battleship = [];
    this.cruisers = [];
    this.destroyers = [];
    this.submarines = [];
  }

  #renderShip(array, mode, coordinate, shipClass) {
    mode === 'h'
      ? array.forEach((element) => {
          this.matrix[coordinate][element].push(shipClass);
          this.matrix[coordinate][element].push(this[shipClass].length - 1);
        })
      : array.forEach((element) => {
          this.matrix[element][coordinate].push(shipClass);
          this.matrix[element][coordinate].push(this[shipClass].length - 1);
        });
  }

  placeShip(shipSize, y, x, orientation = 'h') {
    if (x + shipSize > 10 || y > 10 || x < 1 || y < 1) {
      return 'x- and y-coordinates should be in the range of 1 and 10';
    } else if (shipSize < 1 || shipSize > 4) {
      return 'Ship size should be in the range of 1 and 4';
    } else {
      let canPosition = true;
      let positionArray = [];

      for (let i = 0; i < shipSize; i++) {
        canPosition = checkPosition(
          this.matrix,
          i,
          y,
          x,
          shipSize,
          orientation
        );

        if (canPosition === true) {
          orientation === 'h'
            ? positionArray.push(x + i)
            : positionArray.push(y + i);
        }
      }

      if (canPosition === true) {
        let ship = new Ship(shipSize);

        switch (shipSize) {
          case 1:
            if (this.submarines.length < 4) {
              this.submarines.push(ship);

              orientation === 'h'
                ? this.#renderShip(positionArray, 'h', y, 'submarines')
                : this.#renderShip(positionArray, 'v', x, 'submarines');
            }
            break;
          case 2:
            if (this.destroyers.length < 3) {
              this.destroyers.push(ship);

              orientation === 'h'
                ? this.#renderShip(positionArray, 'h', y, 'destroyers')
                : this.#renderShip(positionArray, 'v', x, 'destroyers');
            }
            break;
          case 3:
            if (this.cruisers.length < 2) {
              this.cruisers.push(ship);

              orientation === 'h'
                ? this.#renderShip(positionArray, 'h', y, 'cruisers')
                : this.#renderShip(positionArray, 'v', x, 'cruisers');
            }
            break;
          case 4:
            if (this.battleship < 1) {
              this.battleship.push(ship);
              this.#renderShip(positionArray, 'h', y, 'battleship');

              orientation === 'h'
                ? this.#renderShip(positionArray, 'h', y, 'battleship')
                : this.#renderShip(positionArray, 'v', x, 'battleship');
            }
            break;
        }
      }
    }
  }
}

function checkPosition(matrix, i, y, x, shipSize, orientation) {
  if (orientation === 'h') {
    if (
      matrix[y][x - 1][0] !== undefined ||
      matrix[y][x + i][0] !== undefined ||
      matrix[y][x + shipSize][0] !== undefined ||
      matrix[y - 1][x - 1][0] !== undefined ||
      matrix[y - 1][x + i][0] !== undefined ||
      matrix[y - 1][x + shipSize][0] !== undefined ||
      matrix[y + 1][x + i][0] !== undefined ||
      matrix[y + 1][x - 1][0] !== undefined ||
      matrix[y + 1][x + shipSize][0] !== undefined
    ) {
      return false;
    }

    return true;
  } else if (orientation === 'v') {
    if (
      matrix[y - 1][x][0] !== undefined ||
      matrix[y + i][x][0] !== undefined ||
      matrix[y + shipSize][x][0] !== undefined ||
      matrix[y - 1][x - 1][0] !== undefined ||
      matrix[y + i][x - 1][0] !== undefined ||
      matrix[y + shipSize][x - 1][0] !== undefined ||
      matrix[y + i][x + 1][0] !== undefined ||
      matrix[y - 1][x + 1][0] !== undefined ||
      matrix[y + shipSize][x + 1][0] !== undefined
    ) {
      return false;
    }

    return true;
  }
}
