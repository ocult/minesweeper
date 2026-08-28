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
    this.revealed[x][y] = true;
  }

  reset(): void {
    const definition = this.definition;
    if (!definition) {
      return;
    }

    this.revealed = definition.camp.map(row => row.map(() => false));
  }

  backToDefinition(): void {
    this.router.navigate(['/def']);
  }
}
