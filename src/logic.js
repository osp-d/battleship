export { Ship, GameBoard, Player, Game };

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
  #sunkCounter = 0;

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
    if (
      (orientation === 'h' &&
        (x + shipSize > 11 || y > 10 || x < 1 || y < 1)) ||
      (orientation === 'v' && (y + shipSize > 11 || x > 10 || x < 1 || y < 1))
    ) {
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
              this.#sunkCounter += shipSize;

              orientation === 'h'
                ? this.#renderShip(positionArray, 'h', y, 'submarines')
                : this.#renderShip(positionArray, 'v', x, 'submarines');
            }
            break;
          case 2:
            if (this.destroyers.length < 3) {
              this.destroyers.push(ship);
              this.#sunkCounter += shipSize;

              orientation === 'h'
                ? this.#renderShip(positionArray, 'h', y, 'destroyers')
                : this.#renderShip(positionArray, 'v', x, 'destroyers');
            }
            break;
          case 3:
            if (this.cruisers.length < 2) {
              this.cruisers.push(ship);
              this.#sunkCounter += shipSize;

              orientation === 'h'
                ? this.#renderShip(positionArray, 'h', y, 'cruisers')
                : this.#renderShip(positionArray, 'v', x, 'cruisers');
            }
            break;
          case 4:
            if (this.battleship < 1) {
              this.battleship.push(ship);
              this.#sunkCounter += shipSize;

              orientation === 'h'
                ? this.#renderShip(positionArray, 'h', y, 'battleship')
                : this.#renderShip(positionArray, 'v', x, 'battleship');
            }
            break;
        }
      }
    }
  }

  receiveAttack(y, x) {
    if (this.matrix[y][x][0] === undefined) {
      this.matrix[y][x].push('attacked');
    } else if (
      this.matrix[y][x][0] !== undefined &&
      this.matrix[y][x][0] !== 'attacked' &&
      this.matrix[y][x][2] !== 'attacked'
    ) {
      const shipClass = this.matrix[y][x][0];
      const shipID = this.matrix[y][x][1];
      this.matrix[y][x][2] = 'attacked';

      this[shipClass][shipID].hits();
      this.#sunkCounter--;

      if (this.#sunkCounter === 0) {
        return true;
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

class Player {
  constructor(playerType) {
    this.playerType = playerType;
    this.board = new GameBoard();
  }
}

class Game {
  #computerTurnsArray = [];

  constructor() {
    this.player1 = new Player('human');
    this.player2 = new Player('computer');
    this.running = true;
    this.turn = 1;
    this.computerAttackCoordinate = [1, 1];
  }

  nextTurn() {
    const objectReference = this;

    if (this.turn === 1) {
      this.turn = 2;
    } else {
      const resultPoints = this.#computerTurn();
      const resultString = `${resultPoints[0]}${resultPoints[1]}`;

      if (!this.#computerTurnsArray.includes(resultString)) {
        this.#computerTurnsArray.push(`${resultPoints[0]}${resultPoints[1]}`);
        this.computerAttackCoordinate[0] = resultPoints[0];
        this.computerAttackCoordinate[1] = resultPoints[1];

        if (
          this.player1.board.receiveAttack(resultPoints[0], resultPoints[1])
        ) {
          this.running = false;
        }

        this.turn = 1;
      } else {
        objectReference.nextTurn();
      }
    }
  }

  #computerTurn() {
    const hitPointY = Math.floor(Math.random() * 10) + 1;
    const hitPointX = Math.floor(Math.random() * 10) + 1;

    return [hitPointY, hitPointX];
  }
}
