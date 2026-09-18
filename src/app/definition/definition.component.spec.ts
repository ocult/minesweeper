import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { DefinitionComponent } from './definition.component';
import { provideRouter } from '@angular/router';
import { PlayStateService } from '../play/play-state.service';

describe('DefinitionComponent', () => {
  let component: DefinitionComponent;
  let fixture: ComponentFixture<DefinitionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, DefinitionComponent],
      providers: [provideRouter([]), PlayStateService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente de definição', () => {
    expect(component).toBeTruthy();
  });

  it('deve validar se o número de bombas é menor que o total de células', () => {
    component.definition = {
      rows: 2,
      cols: 2,
      bombs: 4,
      camp: [
        [-1, -1],
        [-1, -1]
      ]
    } as any;
    expect(component.hasBomb).toBe(true);
    expect(component.hasEmptySpace).toBe(false);
  });

  it('deve emitir o evento ou navegar ao submeter configurações válidas', () => {
    const playState = TestBed.inject(PlayStateService);
    component.definition = {
      rows: 2,
      cols: 2,
      bombs: 1,
      camp: [
        [0, -1],
        [0, 0]
      ]
    } as any;
    expect(component.hasBomb).toBe(true);
    expect(component.hasEmptySpace).toBe(true);
    
    component.createCamp();
    expect(playState.definition).toBe(component.definition);
  });
});
