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

  expect(firstGameBoard.matrix.length).toBe(10);
  expect(firstGameBoard.matrix[0].length).toBe(10);
});

test('Initial ship placement', () => {
  let firstGameBoard = new GameBoard();

  expect(firstGameBoard.placeShip(2, 9, 0)).toBe(
    'x- and y-coordinates should be in the range of 0 and 9'
  );
  expect(firstGameBoard.placeShip(2, 7, -1)).toBe(
    'x- and y-coordinates should be in the range of 0 and 9'
  );
  expect(firstGameBoard.placeShip(2, -1, 0)).toBe(
    'x- and y-coordinates should be in the range of 0 and 9'
  );
  expect(firstGameBoard.placeShip(2, 7, 10)).toBe(
    'x- and y-coordinates should be in the range of 0 and 9'
  );

  expect(firstGameBoard.placeShip(5, 0, 0)).toBe(
    'Ship size should be in the range of 1 and 4'
  );

  firstGameBoard.placeShip(4, 0, 0);
  expect(firstGameBoard.matrix[0][0][0]).toBe('ship1');
  expect(firstGameBoard.matrix[0][1][0]).toBe('ship1');
  expect(firstGameBoard.matrix[0][2][0]).toBe('ship1');
  expect(firstGameBoard.matrix[0][3][0]).toBe('ship1');
});
