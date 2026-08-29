import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Bootcamp } from './bootcamp';
import { CampStateService } from '../camp/camp-state.service';

@Component({
  selector: 'app-camp-definition',
  templateUrl: './camp-definition.component.html',
  styleUrls: ['./camp-definition.component.less'],
  imports: [CommonModule, FormsModule]
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
    return value === ' ' ? '' : value;
  }

  getButtonClasses(x: number, y: number): string[] {
    const classes = ['cell-button'];
    if (this.definition.display(x, y) === '*') {
      classes.push('bomb');
    }

    return classes;
  }

  createCamp(): void {
    this.campState.definition = this.definition;
    this.router.navigate(['/camp']);
  }
}
