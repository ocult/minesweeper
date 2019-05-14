import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Bootcamp } from './bootcamp';

@Component({
  selector: 'app-camp-definition',
  templateUrl: './camp-definition.component.html',
  styleUrls: ['./camp-definition.component.less']
})
export class CampDefinitionComponent implements OnInit {

  definition = new Bootcamp(5, 5);

  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  htmlDisplay(x: number, y: number): SafeHtml {
    return this.domSanitizer.sanitize(SecurityContext.HTML, this.definition.display(x, y).replace(' ', '&nbsp;'));
  }
}
