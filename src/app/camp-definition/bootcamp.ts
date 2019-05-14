export class Bootcamp {
  private internalCamp: number[][];

  constructor(x: number = 1, y: number = 1) {
    this.internalCamp = [];
    if (!(x)) {
      x = 1;
    }
    if (!(y)) {
      y = 1;
    }

    this.buildCamp(0, 0, x, y);
  }

  private buildCamp(x: number, y: number, width: number, height: number): void {
    for (let r = x; r < width; r++) {
      const row = [];
      for (let c = y; c < height; c++) {
        row.push(0);
      }
      this.internalCamp.push(row);
    }
  }

  set x(width: number) {
    if (width === this.x) {
      return;
    }

    if (width > this.x) {
      this.buildCamp(this.x, 0, width, this.y);
    } else if (width > 0) {
      do {
        this.internalCamp.pop();
      } while (this.x > width);
    }
  }

  get x(): number {
    return this.internalCamp.length;
  }

  set y(height: number) {
    if (height === this.y) {
      return;
    }

    if (height > this.y) {
      const oldHeight = this.y;
      this.internalCamp.forEach(row => {
        for (let c = oldHeight; c < height; c++) {
          row.push(0);
        }
      });
    } else if (height > 0) {
      do {
        this.internalCamp.forEach(row => {
          row.pop();
        });
      } while (this.y > height);
    }
  }

  get y(): number {
    return this.internalCamp[0].length;
  }

  get camp(): number[][] {
    this._solve();
    return this.internalCamp;
  }

  display(x: number, y: number): string {
    if (this.internalCamp[x][y] === 0) {
      return ' ';
    } else if (this.internalCamp[x][y] === -1) {
      return '*';
    }
    return this.internalCamp[x][y].toString();
  }

  changeBomb(x: number, y: number): void {
    if (this._isBomb(x, y)) {
      this.clear(x, y);
    } else {
      this.setBomb(x, y);
    }
  }

  setBomb(x: number, y: number): void {
    this.internalCamp[x][y] = -1;
  }

  clear(x: number, y: number): void {
    this.internalCamp[x][y] = 0;
  }

  private _existsInCamp(x: number, y: number) {
    return this.internalCamp[x] !== undefined && this.internalCamp[x][y] !== undefined;
  }

  private _increment(x: number, y: number) {
    if (this._existsInCamp(x, y) && this.internalCamp[x][y] > -1) {
      this.internalCamp[x][y]++;
    }
  }

  private _isBomb(x: number, y: number) {
    return this.internalCamp[x][y] === -1;
  }

  private _clear(): void {
    for (let r = 0; r < this.internalCamp.length; r++) {
      for (let c = 0; c < this.internalCamp[r].length; c++) {
        if (!this._isBomb(r, c)) {
          this.internalCamp[r][c] = 0;
        }
      }
    }
  }

  private _solve(): void {
    this._clear();
    for (let r = 0; r < this.internalCamp.length; r++) {
      for (let c = 0; c < this.internalCamp[r].length; c++) {
        if (this._isBomb(r, c)) {
          this._increment(r - 1, c - 1);
          this._increment(r - 1, c);
          this._increment(r - 1, c + 1);

          this._increment(r, c - 1);
          this._increment(r, c + 1);

          this._increment(r + 1, c - 1);
          this._increment(r + 1, c);
          this._increment(r + 1, c + 1);
        }
      }
    }
  }
}
