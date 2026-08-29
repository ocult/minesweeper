import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MinefieldBoardBase } from '../shared/minefield-board-base';
import { MinefieldAppearance } from '../shared/minefield.types';
import { MinefieldComponent } from '../shared/minefield.component';
import { Bootcamp } from './bootcamp';
import { PlayStateService } from '../play/play-state.service';

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.less'],
  imports: [CommonModule, FormsModule, MinefieldComponent]
})
export class DefinitionComponent extends MinefieldBoardBase implements OnInit {
  definition = new Bootcamp(5, 5);

  constructor(
    private playState: PlayStateService,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
  }

  htmlDisplay(x: number, y: number): string {
    return this.getBoardValue(this.definition, x, y);
  }

  getCellAppearance(x: number, y: number): MinefieldAppearance {
    return this.getRevealedAppearance(this.definition, x, y) === 'bomb' ? 'bomb' : 'hidden';
  }

  createCamp(): void {
    this.playState.definition = this.definition;
    this.router.navigate(['/play']);
  }
}
