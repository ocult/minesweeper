import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MinefieldAppearance } from '../shared/minefield.types';
import { MinefieldComponent } from '../shared/minefield.component';
import { Bootcamp } from './bootcamp';
import { CampStateService } from '../camp/camp-state.service';

@Component({
  selector: 'app-camp-definition',
  templateUrl: './camp-definition.component.html',
  styleUrls: ['./camp-definition.component.less'],
  imports: [CommonModule, FormsModule, MinefieldComponent]
})
export class CampDefinitionComponent implements OnInit {
  definition = new Bootcamp(5, 5);

  constructor(
    private campState: CampStateService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  htmlDisplay(x: number, y: number): string {
    const value = this.definition.display(x, y);
    return value === ' ' ? ' ' : value;
  }

  getCellAppearance(x: number, y: number): MinefieldAppearance {
    return this.definition.display(x, y) === '*' ? 'bomb' : 'hidden';
  }

  createCamp(): void {
    this.campState.definition = this.definition;
    this.router.navigate(['/camp']);
  }
}
