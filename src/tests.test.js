import { Ship, GameBoard } from './logic';

test('Object length property', () => {
  let firstShip = new Ship(1);

  expect(firstShip.length).toBe(1);
  expect(firstShip.hitNumber).toBe(0);

  firstShip.hits();
  expect(firstShip.hitNumber).toBe(1);
  expect(firstShip.sunk).toBe(true);

  firstShip.hits();
  expect(firstShip.hitNumber).toBe(1);
  expect(firstShip.sunk).toBe(true);
});

test('GameBoard matrix structure', () => {
  let firstGameBoard = new GameBoard();

  expect(firstGameBoard.matrix.length).toBe(12);
  expect(firstGameBoard.matrix[0].length).toBe(12);
});

test('Incorrect input', () => {
  let firstGameBoard = new GameBoard();

  expect(firstGameBoard.placeShip(2, 0, 9)).toBe(
    'x- and y-coordinates should be in the range of 1 and 10'
  );
  expect(firstGameBoard.placeShip(2, -1, 7)).toBe(
    'x- and y-coordinates should be in the range of 1 and 10'
  );
  expect(firstGameBoard.placeShip(2, 0, -1)).toBe(
    'x- and y-coordinates should be in the range of 1 and 10'
  );
  expect(firstGameBoard.placeShip(4, 10, 7)).toBe(
    'x- and y-coordinates should be in the range of 1 and 10'
  );

  expect(firstGameBoard.placeShip(5, 1, 1)).toBe(
    'Ship size should be in the range of 1 and 4'
  );
});

test('Initial ship placement', () => {
  let firstGameBoard = new GameBoard();

  // Horizontal positioning tests

  firstGameBoard.placeShip(4, 1, 1);
  expect(firstGameBoard.matrix[1][1][0]).toBe('battleship');
  expect(firstGameBoard.matrix[1][2][0]).toBe('battleship');
  expect(firstGameBoard.matrix[1][3][0]).toBe('battleship');
  expect(firstGameBoard.matrix[1][4][0]).toBe('battleship');
  expect(firstGameBoard.matrix[1][1][1]).toBe(0);
  expect(firstGameBoard.matrix[1][2][1]).toBe(0);
  expect(firstGameBoard.matrix[1][3][1]).toBe(0);
  expect(firstGameBoard.matrix[1][4][1]).toBe(0);

  firstGameBoard.placeShip(2, 6, 6);
  expect(firstGameBoard.matrix[6][6][0]).toBe('destroyers');
  expect(firstGameBoard.matrix[6][7][0]).toBe('destroyers');
  expect(firstGameBoard.matrix[6][6][1]).toBe(0);
  expect(firstGameBoard.matrix[6][7][1]).toBe(0);

  firstGameBoard.placeShip(1, 5, 5);
  expect(firstGameBoard.matrix[5][5][0]).toBe(undefined);
  firstGameBoard.placeShip(1, 5, 6);
  expect(firstGameBoard.matrix[5][6][0]).toBe(undefined);
  firstGameBoard.placeShip(1, 5, 7);
  expect(firstGameBoard.matrix[5][7][0]).toBe(undefined);
  firstGameBoard.placeShip(1, 5, 8);
  expect(firstGameBoard.matrix[5][8][0]).toBe(undefined);
  firstGameBoard.placeShip(1, 6, 5);
  expect(firstGameBoard.matrix[6][5][0]).toBe(undefined);
  firstGameBoard.placeShip(1, 6, 6);
  expect(firstGameBoard.matrix[6][6][0]).toBe('destroyers');
  firstGameBoard.placeShip(1, 6, 7);
  expect(firstGameBoard.matrix[6][7][0]).toBe('destroyers');
  firstGameBoard.placeShip(1, 6, 8);
  expect(firstGameBoard.matrix[6][8][0]).toBe(undefined);
  firstGameBoard.placeShip(1, 7, 5);
  expect(firstGameBoard.matrix[7][5][0]).toBe(undefined);
  firstGameBoard.placeShip(1, 7, 6);
  expect(firstGameBoard.matrix[7][6][0]).toBe(undefined);
  firstGameBoard.placeShip(1, 7, 7);
  expect(firstGameBoard.matrix[7][7][0]).toBe(undefined);
  firstGameBoard.placeShip(1, 7, 8);
  expect(firstGameBoard.matrix[7][8][0]).toBe(undefined);

  // Vertical positioning tests

  firstGameBoard.placeShip(2, 7, 2, 'v');
  expect(firstGameBoard.matrix[7][2][0]).toBe('destroyers');
  expect(firstGameBoard.matrix[8][2][0]).toBe('destroyers');
  expect(firstGameBoard.matrix[7][2][1]).toBe(1);
  expect(firstGameBoard.matrix[8][2][1]).toBe(1);

  firstGameBoard.placeShip(2, 5, 1, 'v');
  expect(firstGameBoard.matrix[5][1][0]).toBe(undefined);
  firstGameBoard.placeShip(2, 5, 2, 'v');
  expect(firstGameBoard.matrix[5][2][0]).toBe(undefined);
  firstGameBoard.placeShip(2, 5, 3, 'v');
  expect(firstGameBoard.matrix[5][3][0]).toBe(undefined);
  firstGameBoard.placeShip(2, 7, 1, 'v');
  expect(firstGameBoard.matrix[7][1][0]).toBe(undefined);
  firstGameBoard.placeShip(2, 7, 3, 'v');
  expect(firstGameBoard.matrix[7][3][0]).toBe(undefined);
  firstGameBoard.placeShip(2, 9, 1, 'v');
  expect(firstGameBoard.matrix[9][1][0]).toBe(undefined);
  firstGameBoard.placeShip(2, 9, 2, 'v');
  expect(firstGameBoard.matrix[9][2][0]).toBe(undefined);
  firstGameBoard.placeShip(2, 9, 3, 'v');
  expect(firstGameBoard.matrix[9][3][0]).toBe(undefined);
});

test('Maximum number of positioned ships', () => {
  let firstGameBoard = new GameBoard();

  firstGameBoard.placeShip(4, 1, 1);
  expect(firstGameBoard.matrix[1][1][0]).toBe('battleship');
  expect(firstGameBoard.matrix[1][2][0]).toBe('battleship');
  expect(firstGameBoard.matrix[1][3][0]).toBe('battleship');
  expect(firstGameBoard.matrix[1][4][0]).toBe('battleship');

  firstGameBoard.placeShip(4, 6, 6);
  expect(firstGameBoard.matrix[6][6][0]).toBe(undefined);
  expect(firstGameBoard.matrix[6][7][0]).toBe(undefined);
  expect(firstGameBoard.matrix[6][8][0]).toBe(undefined);
  expect(firstGameBoard.matrix[6][9][0]).toBe(undefined);

  firstGameBoard.placeShip(1, 3, 1);
  expect(firstGameBoard.matrix[3][1][0]).toBe('submarines');
  expect(firstGameBoard.matrix[3][1][1]).toBe(0);

  firstGameBoard.placeShip(1, 3, 3);
  expect(firstGameBoard.matrix[3][3][0]).toBe('submarines');
  expect(firstGameBoard.matrix[3][3][1]).toBe(1);

  firstGameBoard.placeShip(1, 3, 5);
  expect(firstGameBoard.matrix[3][5][0]).toBe('submarines');
  expect(firstGameBoard.matrix[3][5][1]).toBe(2);

  firstGameBoard.placeShip(1, 3, 7);
  expect(firstGameBoard.matrix[3][7][0]).toBe('submarines');
  expect(firstGameBoard.matrix[3][7][1]).toBe(3);

  firstGameBoard.placeShip(1, 3, 9);
  expect(firstGameBoard.matrix[3][9][0]).toBe(undefined);
  expect(firstGameBoard.matrix[3][9][1]).toBe(undefined);
});
