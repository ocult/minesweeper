import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampDefinitionComponent } from './camp-definition.component';
import { FormsModule } from '@angular/forms';

describe('CampDefinitionComponent', () => {
  let component: CampDefinitionComponent;
  let fixture: ComponentFixture<CampDefinitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CampDefinitionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
