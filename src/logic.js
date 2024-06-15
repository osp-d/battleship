class Ship {
  constructor(length) {
    (this.length = length), (this.hitNumber = 0), (this.sunk = false);
  }

  hits() {
    if (this.isSunk() === false) {
      this.hitNumber++;
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
