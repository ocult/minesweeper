import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CampStateService } from './camp-state.service';

@Component({
  selector: 'app-camp',
  templateUrl: './camp.component.html',
  styleUrls: ['./camp.component.less'],
  imports: [CommonModule]
})
export class CampComponent implements OnDestroy {
  revealed: boolean[][] = [];
  marks: Array<Array<'flag' | 'question' | null>> = [];
  gameOver = false;
  gameWon = false;
  elapsedSeconds = 0;
  private timerId: ReturnType<typeof setInterval> | undefined;

  constructor(
    private campState: CampStateService,
    private router: Router,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    if (!this.campState.definition) {
      this.router.navigate(['/def']);
      return;
    }

    this.reset();
  }

  get definition() {
    return this.campState.definition;
  }

  get elapsedTimeLabel(): string {
    const minutes = Math.floor(this.elapsedSeconds / 60);
    const seconds = this.elapsedSeconds % 60;
    return `${minutes}min ${seconds}s`;
  }

  get totalBombs(): number {
    const definition = this.definition;
    if (!definition) {
      return 0;
    }

    let total = 0;
    for (const row of definition.camp) {
      for (const value of row) {
        if (value === -1) {
          total++;
        }
      }
    }

    return total;
  }

  get flaggedCells(): number {
    let total = 0;
    for (const row of this.marks) {
      for (const value of row) {
        if (value === 'flag') {
          total++;
        }
      }
    }

    return total;
  }

  get statusTitle(): string {
    if (this.gameOver) {
      return 'Você foi explodido';
    }

    if (this.gameWon) {
      return 'Você venceu';
    }

    return 'Campo minado';
  }

  getCellValue(x: number, y: number): string {
    if (!this.revealed[x][y]) {
      return '';
    }

    const value = this.definition?.display(x, y) ?? ' ';
    return value === ' ' ? '' : value;
  }

  getButtonClasses(x: number, y: number): string[] {
    const classes = ['cell-button'];
    if (!this.revealed[x][y]) {
      const mark = this.marks[x][y];
      if (mark === 'flag') {
        classes.push('flag');
        return classes;
      }

      if (mark === 'question') {
        classes.push('question');
        return classes;
      }

      classes.push('hidden');
      return classes;
    }

    classes.push('revealed');
    if (this.definition?.camp[x][y] === -1) {
      classes.push('bomb');
    }

    return classes;
  }

  onCellContextMenu(event: MouseEvent, x: number, y: number): void {
    event.preventDefault();
    this.toggleMark(x, y);
  }

  toggleMark(x: number, y: number): void {
    if (this.gameOver || this.gameWon || this.revealed[x][y]) {
      return;
    }

    const current = this.marks[x][y];
    if (current === 'flag') {
      this.marks[x][y] = 'question';
      this.checkVictory();
      return;
    }

    if (current === 'question') {
      this.marks[x][y] = null;
      return;
    }

    this.marks[x][y] = 'flag';
    this.checkVictory();
  }

  reveal(x: number, y: number): void {
    if (this.gameOver || this.gameWon || this.revealed[x][y] || this.marks[x][y] !== null) {
      return;
    }

    const definition = this.definition;
    if (!definition) {
      return;
    }

    if (definition.camp[x][y] === -1) {
      this.gameOver = true;
      this.revealed = definition.camp.map(row => row.map(() => true));
      this.stopTimer();
      return;
    }

    if (definition.camp[x][y] > 0) {
      this.revealed[x][y] = true;
      this.checkVictory();
      return;
    }

    this.revealEmptyArea(x, y);
    this.checkVictory();
  }

  reset(): void {
    const definition = this.definition;
    if (!definition) {
      return;
    }

    this.gameOver = false;
    this.gameWon = false;
    this.elapsedSeconds = 0;
    this.revealed = definition.camp.map(row => row.map(() => false));
    this.marks = definition.camp.map(row => row.map(() => null));
    this.startTimer();
  }

  backToDefinition(): void {
    this.router.navigate(['/def']);
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  private checkVictory(): void {
    const definition = this.definition;
    if (!definition) {
      return;
    }

    const allBombsFlagged = definition.camp.every((row, rowIndex) =>
      row.every((cell, columnIndex) => {
        if (cell !== -1) {
          return true;
        }

        return this.marks[rowIndex][columnIndex] === 'flag';
      })
    );

    const onlyBombsFlagged = definition.camp.every((row, rowIndex) =>
      row.every((cell, columnIndex) => {
        if (this.marks[rowIndex][columnIndex] === 'flag') {
          return cell === -1;
        }

        return true;
      })
    );

    if (allBombsFlagged && onlyBombsFlagged) {
      this.finishVictory();
      return;
    }

    for (let row = 0; row < definition.camp.length; row++) {
      for (let column = 0; column < definition.camp[row].length; column++) {
        if (definition.camp[row][column] !== -1 && !this.revealed[row][column]) {
          return;
        }
      }
    }

    this.finishVictory();
  }

  private finishVictory(): void {
    if (this.gameWon) {
      return;
    }

    const definition = this.definition;
    if (!definition) {
      return;
    }

    this.gameWon = true;
    this.stopTimer();
    this.revealed = definition.camp.map(row => row.map(() => true));
  }

  private revealEmptyArea(x: number, y: number): void {
    const definition = this.definition;
    if (!definition) {
      return;
    }

    const pending = [[x, y]];
    while (pending.length > 0) {
      const current = pending.shift();
      if (!current) {
        continue;
      }

      const [currentX, currentY] = current;
      if (this.revealed[currentX][currentY]) {
        continue;
      }

      this.revealed[currentX][currentY] = true;
      if (definition.camp[currentX][currentY] !== 0) {
        continue;
      }

      for (let row = currentX - 1; row <= currentX + 1; row++) {
        for (let column = currentY - 1; column <= currentY + 1; column++) {
          if (
            row >= 0 &&
            row < this.revealed.length &&
            column >= 0 &&
            column < this.revealed[row].length &&
            !this.revealed[row][column] &&
            definition.camp[row][column] !== -1
          ) {
            pending.push([row, column]);
          }
        }
      }
    }
  }

  private startTimer(): void {
    this.stopTimer();
    this.ngZone.run(() => {
      this.timerId = setInterval(() => {
        if (!this.gameOver && !this.gameWon) {
          this.elapsedSeconds++;
          this.cdr.detectChanges();
        }
      }, 1000);
    });
  }

  private stopTimer(): void {
    if (this.timerId !== undefined) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }
}
