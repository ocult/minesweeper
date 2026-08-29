import { MinefieldBoardDefinition } from '../shared/minefield.types';

export class Bootcamp implements MinefieldBoardDefinition {
  private readonly internalCamp: number[][];

  constructor(x: number = 1, y: number = 1) {
    this.internalCamp = [];
    this.buildCamp(0, 0, Math.max(1, x), Math.max(1, y));
  }

  private buildCamp(startRow: number, startColumn: number, width: number, height: number): void {
    for (let rowIndex = startRow; rowIndex < width; rowIndex++) {
      const row: number[] = [];
      for (let columnIndex = startColumn; columnIndex < height; columnIndex++) {
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
      return;
    }

    while (this.x > width && this.x > 0) {
      this.internalCamp.pop();
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
        for (let columnIndex = oldHeight; columnIndex < height; columnIndex++) {
          row.push(0);
        }
      });
      return;
    }

    while (this.y > height && this.y > 0) {
      this.internalCamp.forEach(row => row.pop());
    }
  }

  get y(): number {
    return this.internalCamp[0]?.length ?? 0;
  }

  get camp(): number[][] {
    this.solve();
    return this.internalCamp;
  }

  display(x: number, y: number): string {
    const cell = this.internalCamp[x]?.[y];

    if (cell === 0) {
      return ' ';
    }

    if (cell === -1) {
      return '*';
    }

    return String(cell);
  }

  changeBomb(x: number, y: number): void {
    if (this.isBomb(x, y)) {
      this.clear(x, y);
      return;
    }

    this.setBomb(x, y);
  }

  setBomb(x: number, y: number): void {
    this.internalCamp[x][y] = -1;
  }

  clear(x: number, y: number): void {
    this.internalCamp[x][y] = 0;
  }

  private existsInCamp(x: number, y: number): boolean {
    return this.internalCamp[x] !== undefined && this.internalCamp[x][y] !== undefined;
  }

  private increment(x: number, y: number): void {
    if (this.existsInCamp(x, y) && this.internalCamp[x][y] > -1) {
      this.internalCamp[x][y]++;
    }
  }

  private isBomb(x: number, y: number): boolean {
    return this.internalCamp[x]?.[y] === -1;
  }

  private clearBoard(): void {
    for (let rowIndex = 0; rowIndex < this.internalCamp.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.internalCamp[rowIndex].length; columnIndex++) {
        if (!this.isBomb(rowIndex, columnIndex)) {
          this.internalCamp[rowIndex][columnIndex] = 0;
        }
      }
    }
  }

  private solve(): void {
    this.clearBoard();

    for (let rowIndex = 0; rowIndex < this.internalCamp.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.internalCamp[rowIndex].length; columnIndex++) {
        if (!this.isBomb(rowIndex, columnIndex)) {
          continue;
        }

        this.increment(rowIndex - 1, columnIndex - 1);
        this.increment(rowIndex - 1, columnIndex);
        this.increment(rowIndex - 1, columnIndex + 1);
        this.increment(rowIndex, columnIndex - 1);
        this.increment(rowIndex, columnIndex + 1);
        this.increment(rowIndex + 1, columnIndex - 1);
        this.increment(rowIndex + 1, columnIndex);
        this.increment(rowIndex + 1, columnIndex + 1);
      }
    }
  }
}
