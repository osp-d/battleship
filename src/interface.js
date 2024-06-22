import { Game } from './logic';
import './style.css';

const myCells = document.querySelectorAll('#player .cell');
const oppCells = document.querySelectorAll('#opponent .cell');
const playerRows = document.querySelectorAll('#player > .battlefield > .row');
const opponentRows = document.querySelectorAll(
  '#opponent > .battlefield > .row'
);
const newGameBtn = document.querySelector('.new-game');
const gameStatus = document.querySelector('.game-status');
const placeShipsControls = document.querySelector('.placement-controls');
const placeShipsBtn = document.querySelector('.place');
const shipClassOption = document.getElementById('ship');
const positionOption = document.getElementById('position');
const yCoordinateOption = document.getElementById('Y-coordinate');
const xCoordinateOption = document.getElementById('X-coordinate');

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

const handlers1 = new Map();
const handlers2 = new Map();
const handlers3 = new Map();
const handlers4 = new Map();
const attackHandler = (element) => () => playerAttack(element);
const overHandler = (element) => () => {
  if (!element.classList.contains('clicked')) element.classList.add('hovered');
};
const leaveHandler = (element) => () => element.classList.remove('hovered');
const upHandler = (element) => () => element.classList.remove('hovered');

newGameBtn.addEventListener('click', () => {
  placeShipsControls.classList.remove('invisible');
  playRound();
});

placeShipsBtn.addEventListener('click', () => {
  if (
    shipClassOption.value !== '' &&
    positionOption.value !== '' &&
    yCoordinateOption.value !== '' &&
    xCoordinateOption.value !== ''
  ) {
    const a = +shipClassOption.value;
    const b = positionOption.value;
    const c = +yCoordinateOption.value;
    const d = +xCoordinateOption.value;

    player1.board.placeShip(a, c, d, b);

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
});

function checkPositioning(conditionFunction) {
  const result = (resolve) => {
    if (conditionFunction()) {
      resolve();
    } else {
      setTimeout((_) => {
        result(resolve), 400;
      });
    }
  };

  return new Promise(result);
}

async function playRound() {
  game = new Game();
  player1 = game.player1;
  player2 = game.player2;

  gameStatus.textContent = 'Your turn';

  myCells.forEach((element) => {
    if (element.hasChildNodes()) element.removeChild(element.firstChild);

    if (element.classList.contains('hit')) element.classList.remove('hit');

    if (element.classList.contains('clicked'))
      element.classList.remove('clicked');

    if (element.classList.contains('untouched'))
      element.classList.remove('untouched');
  });

  oppCells.forEach((element) => {
    if (element.hasChildNodes()) element.removeChild(element.firstChild);

    if (element.classList.contains('hit')) element.classList.remove('hit');

    if (element.classList.contains('clicked'))
      element.classList.remove('clicked');
  });

  await checkPositioning((_) => {
    if (
      player1.board.battleship.length === 1 &&
      player1.board.cruisers.length === 2 &&
      player1.board.destroyers.length === 3 &&
      player1.board.submarines.length === 4
    )
      return true;
  }).then(() => {
    oppCells.forEach((element) => {
      const handler1 = attackHandler(element);
      handlers1.set(element, handler1);
      element.addEventListener('click', handler1);

      const handler2 = overHandler(element);
      handlers2.set(element, handler2);
      element.addEventListener('mouseover', handler2);

      const handler3 = leaveHandler(element);
      handlers3.set(element, handler3);
      element.addEventListener('mouseleave', handler3);

      const handler4 = upHandler(element);
      handlers4.set(element, handler4);
      element.addEventListener('mouseup', handler4);
    });

    placeShipsControls.classList.add('invisible');
  });

  // Pre-defined ship placement for test
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
}

function computerAttack() {
  game.nextTurn();
  gameStatus.textContent = 'Your turn';

  if (player2.winner === true) {
    gameStatus.textContent = 'You lose!';

    oppCells.forEach((element) => {
      const handler1 = handlers1.get(element);
      const handler2 = handlers2.get(element);
      const handler3 = handlers3.get(element);
      const handler4 = handlers4.get(element);
      if (handler1) element.removeEventListener('click', handler1);
      if (handler2) element.removeEventListener('mouseover', handler2);
      if (handler3) element.removeEventListener('mouseleave', handler3);
      if (handler4) element.removeEventListener('mouseup', handler4);
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
        const handler1 = handlers1.get(element);
        const handler2 = handlers2.get(element);
        const handler3 = handlers3.get(element);
        const handler4 = handlers4.get(element);
        if (handler1) element.removeEventListener('click', handler1);
        if (handler2) element.removeEventListener('mouseover', handler2);
        if (handler3) element.removeEventListener('mouseleave', handler3);
        if (handler4) element.removeEventListener('mouseup', handler4);
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
        const handler1 = handlers1.get(element);
        const handler2 = handlers2.get(element);
        const handler3 = handlers3.get(element);
        const handler4 = handlers4.get(element);
        if (handler1) element.removeEventListener('click', handler1);
        if (handler2) element.removeEventListener('mouseover', handler2);
        if (handler3) element.removeEventListener('mouseleave', handler3);
        if (handler4) element.removeEventListener('mouseup', handler4);
      });
      return;
    }

    game.nextTurn();
    gameStatus.textContent = 'Computer turn';
    computerAttack();
  }
};
