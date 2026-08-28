import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CampStateService } from './camp-state.service';

@Component({
  selector: 'app-camp',
  templateUrl: './camp.component.html',
  styleUrls: ['./camp.component.less'],
  imports: [CommonModule]
})
export class CampComponent {
  revealed: boolean[][] = [];
  gameOver = false;

  constructor(
    private campState: CampStateService,
    private router: Router
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

  reveal(x: number, y: number): void {
    if (this.gameOver || this.revealed[x][y]) {
      return;
    }

    const definition = this.definition;
    if (!definition) {
      return;
    }

    if (definition.camp[x][y] === -1) {
      this.gameOver = true;
      this.revealed = definition.camp.map(row => row.map(() => true));
      return;
    }

    if (definition.camp[x][y] > 0) {
      this.revealed[x][y] = true;
      return;
    }

    this.revealEmptyArea(x, y);
  }

  reset(): void {
    const definition = this.definition;
    if (!definition) {
      return;
    }

    this.gameOver = false;
    this.revealed = definition.camp.map(row => row.map(() => false));
  }

  backToDefinition(): void {
    this.router.navigate(['/def']);
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
}
