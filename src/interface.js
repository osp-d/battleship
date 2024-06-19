import { Player } from './logic';
import './style.css';

const cells = document.querySelectorAll('.cell');
// const playerBoard = document.querySelector('#player > .battlefield');
// const opponentBoard = document.querySelector('#opponent > .battlefield');
const playerRows = document.querySelectorAll('#player > .battlefield > .row');
const opponentRows = document.querySelectorAll(
  '#opponent > .battlefield > .row'
);

const player1 = new Player();
const player2 = new Player();

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

cells.forEach((element) => {
  element.addEventListener('click', () => {
    const x = +element.id[3] + 1;
    const y = +element.id[1] + 1;

    console.log(y, x);

    if (player1.board.matrix[y][x][0] === undefined) {
      const dot = document.createElement('div');
      element.classList.add('clicked');
      dot.classList.add('miss');
      element.appendChild(dot);
    } else if (
      player1.board.matrix[y][x][0] !== undefined &&
      player1.board.matrix[y][x][0] !== 'attacked' &&
      player1.board.matrix[y][x][2] !== 'attacked'
    ) {
      element.classList.add('hit');
      element.classList.add('clicked');
    }

    player1.board.receiveAttack(y, x);

    console.log(player1.board.matrix);
  });

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

// Pre-defined ship placement for test

player1.board.placeShip(4, 1, 1, 'v');
player1.board.placeShip(3, 2, 4);
player1.board.placeShip(3, 4, 8);
player1.board.placeShip(2, 6, 3, 'v');
player1.board.placeShip(2, 7, 5);
player1.board.placeShip(2, 10, 9);
player1.board.placeShip(1, 6, 8);
player1.board.placeShip(1, 9, 2);
player1.board.placeShip(1, 4, 5);
player1.board.placeShip(1, 10, 5);
player1.board.placeShip(1, 10, 1);
