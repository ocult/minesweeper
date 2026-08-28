import { CommonModule } from '@angular/common';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Bootcamp } from './bootcamp';

@Component({
  selector: 'app-camp-definition',
  templateUrl: './camp-definition.component.html',
  styleUrls: ['./camp-definition.component.less'],
  imports: [CommonModule, FormsModule]
})
export class CampDefinitionComponent implements OnInit {

  definition = new Bootcamp(5, 5);

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  htmlDisplay(x: number, y: number): string {
    return this.domSanitizer.sanitize(SecurityContext.HTML, this.definition.display(x, y).replace(' ', '&nbsp;')) || '';
  }
}
