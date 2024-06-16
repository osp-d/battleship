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
    this.battleship = new Ship(4);
    this.cruisers = [new Ship(3), new Ship(3)];
    this.destroyers = [new Ship(2), new Ship(2), new Ship(2)];
    this.submarines = [new Ship(1), new Ship(1), new Ship(1), new Ship(1)];
  }

  placeShip(shipSize, x, y, orientation = 'h') {
    if (x + shipSize > 9 || y > 9 || x < 0 || y < 0) {
      return 'x- and y-coordinates should be in the range of 0 and 9';
    } else {
      if (shipSize < 1 || shipSize > 4) {
        return 'Ship size should be in the range of 1 and 4';
      } else {
        for (let i = 0; i < shipSize; i++) {
          this.matrix[y][x + i].push('ship1');
        }
      }
    }
  }
}
