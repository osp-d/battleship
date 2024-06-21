import { Game } from './logic';
import './style.css';

const myCells = document.querySelectorAll('#player .cell');
const oppCells = document.querySelectorAll('#opponent .cell');
const playerRows = document.querySelectorAll('#player > .battlefield > .row');
const opponentRows = document.querySelectorAll(
  '#opponent > .battlefield > .row'
);
const newGameBtn = document.querySelector('button');
const gameStatus = document.querySelector('.game-status');

let game = new Game();
let player1 = game.player1;
let player2 = game.player2;

for (let i = 0; i < playerRows.length; i++) {
  playerRows[i].setAttribute('id', `p${i}`);

  const currentRow = document.querySelectorAll(`#p${i} > .cell`);

  for (let j = 0; j < currentRow.length; j++) {
    currentRow[j].setAttribute('id', `p${i}-${j}`);
  }
}

for (let i = 0; i < opponentRows.length; i++) {
  opponentRows[i].setAttribute('id', `o${i}`);

  const currentRow = document.querySelectorAll(`#o${i} > .cell`);

  for (let j = 0; j < currentRow.length; j++) {
    currentRow[j].setAttribute('id', `o${i}-${j}`);
  }
}

const handlers = new Map();
const attackHandler = (element) => () => playerAttack(element);

newGameBtn.addEventListener('click', () => playRound());

function playRound() {
  myCells.forEach((element) => {
    if (element.hasChildNodes()) {
      element.removeChild(element.firstChild);
    }

    if (element.classList.contains('hit')) {
      element.classList.remove('hit');
    }

    if (element.classList.contains('clicked')) {
      element.classList.remove('clicked');
    }
  });

  oppCells.forEach((element) => {
    const handler = attackHandler(element);
    handlers.set(element, handler);
    element.addEventListener('click', handler);

    if (element.hasChildNodes()) {
      element.removeChild(element.firstChild);
    }

    if (element.classList.contains('hit')) {
      element.classList.remove('hit');
    }

    if (element.classList.contains('clicked')) {
      element.classList.remove('clicked');
    }

    element.addEventListener('mouseover', () => {
      if (!element.classList.contains('clicked')) {
        element.classList.add('hovered');
      }
    });

    element.addEventListener('mouseleave', () => {
      element.classList.remove('hovered');
    });

    element.addEventListener('mouseup', () => {
      element.classList.remove('hovered');
    });
  });

  game = new Game();
  player1 = game.player1;
  player2 = game.player2;

  // Pre-defined ship placement for test

  player1.board.placeShip(4, 2, 3);
  player1.board.placeShip(3, 6, 2, 'v');
  player1.board.placeShip(3, 4, 8, 'v');
  player1.board.placeShip(2, 4, 3);
  player1.board.placeShip(2, 6, 5, 'v');
  player1.board.placeShip(2, 10, 6);
  player1.board.placeShip(1, 1, 10);
  player1.board.placeShip(1, 9, 4);
  player1.board.placeShip(1, 8, 7);
  player1.board.placeShip(1, 9, 10);

  player2.board.placeShip(4, 1, 1, 'v');
  player2.board.placeShip(3, 2, 4);
  player2.board.placeShip(3, 4, 8);
  player2.board.placeShip(2, 6, 3, 'v');
  player2.board.placeShip(2, 7, 5);
  player2.board.placeShip(2, 10, 9);
  player2.board.placeShip(1, 6, 8);
  player2.board.placeShip(1, 9, 2);
  player2.board.placeShip(1, 4, 5);
  player2.board.placeShip(1, 10, 5);
  player2.board.placeShip(1, 10, 1);

  myCells.forEach((element) => {
    const x = +element.id[3] + 1;
    const y = +element.id[1] + 1;

    if (
      player1.board.matrix[y][x][0] !== undefined &&
      player1.board.matrix[y][x][0] !== 'attacked' &&
      player1.board.matrix[y][x][2] !== 'attacked'
    ) {
      element.classList.add('untouched');
    }
  });
}

function computerAttack() {
  game.nextTurn();
  gameStatus.textContent = 'Your turn';

  if (player2.winner === true) {
    gameStatus.textContent = 'You lose!';

    oppCells.forEach((element) => {
      const handler = handlers.get(element);

      if (handler) {
        element.removeEventListener('click', handler);
      }
    });
  }

  const y = game.computerAttackCoordinate[0];
  const x = game.computerAttackCoordinate[1];
  const element = document.getElementById(`p${y - 1}-${x - 1}`);

  if (player1.board.matrix[y][x][0] === 'attacked') {
    const dot = document.createElement('div');
    element.classList.add('clicked');
    dot.classList.add('miss');
    element.appendChild(dot);
  } else if (
    player1.board.matrix[y][x][0] !== 'attacked' &&
    player1.board.matrix[y][x][2] === 'attacked'
  ) {
    element.classList.remove('untouched');
    element.classList.add('hit');
    element.classList.add('clicked');
  }
}

const playerAttack = function (element) {
  const x = +element.id[3] + 1;
  const y = +element.id[1] + 1;

  if (player2.board.matrix[y][x][0] === undefined) {
    const dot = document.createElement('div');
    element.classList.add('clicked');
    dot.classList.add('miss');
    element.appendChild(dot);

    if (player2.board.receiveAttack(y, x) === true) {
      player1.winner = true;
      gameStatus.textContent = 'You win!';

      oppCells.forEach((element) => {
        const handler = handlers.get(element);

        if (handler) {
          element.removeEventListener('click', handler);
        }
      });

      return;
    }

    game.nextTurn();
    gameStatus.textContent = 'Computer turn';
    computerAttack();
  } else if (
    player2.board.matrix[y][x][0] !== undefined &&
    player2.board.matrix[y][x][0] !== 'attacked' &&
    player2.board.matrix[y][x][2] !== 'attacked'
  ) {
    element.classList.add('hit');
    element.classList.add('clicked');

    if (player2.board.receiveAttack(y, x) === true) {
      gameStatus.textContent = 'You win!';

      oppCells.forEach((element) => {
        const handler = handlers.get(element);

        if (handler) {
          element.removeEventListener('click', handler);
        }
      });
      return;
    }

    game.nextTurn();
    gameStatus.textContent = 'Computer turn';
    computerAttack();
  }
};
