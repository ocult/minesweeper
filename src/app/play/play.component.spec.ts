import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayComponent } from './play.component';
import { PlayStateService } from './play-state.service';
import { provideRouter } from '@angular/router';

describe('PlayComponent', () => {
  let component: PlayComponent;
  let fixture: ComponentFixture<PlayComponent>;
  let playStateService: PlayStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    playStateService = TestBed.inject(PlayStateService);
    playStateService.definition = {
      camp: [
        [0, 1, -1],
        [0, 1, 1],
        [0, 0, 0]
      ],
      display: function(x: number, y: number) {
        const val = this.camp[x][y];
        return val === 0 ? ' ' : String(val);
      }
    };

    fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente de jogo e inicializar o tabuleiro corretamente', () => {
    expect(component).toBeTruthy();
    expect(component.totalBombs).toBe(1);
    expect(component.statusTitle).toBe('Campo minado');
  });

  it('deve calcular o rótulo do tempo decorrido corretamente', () => {
    component.elapsedSeconds = 65;
    expect(component.elapsedTimeLabel).toBe('1min 5s');
  });

  it('deve lidar com o clique na célula e revelá-la', () => {
    const appearance = component.getCellAppearance(0, 0);
    expect(appearance).toBe('hidden');
    component.reveal(0, 0);
    expect(component.revealed[0][0]).toBe(true);
  });

  it('deve alternar marcação de bandeira (flag/question/hidden) ao clicar com botão direito (contextmenu)', () => {
    const mockEvent = new MouseEvent('contextmenu');
    const spy = vi.spyOn(mockEvent, 'preventDefault');

    // Primeira marcação: flag
    component.onCellContextMenu(mockEvent, 0, 0);
    expect(spy).toHaveBeenCalled();
    expect(component.marks[0][0]).toBe('flag');
    expect(component.flaggedCells).toBe(1);
    expect(component.getCellAppearance(0, 0)).toBe('flag');

    // Segunda marcação: question
    component.onCellContextMenu(mockEvent, 0, 0);
    expect(component.marks[0][0]).toBe('question');
    expect(component.getCellAppearance(0, 0)).toBe('question');

    // Terceira marcação: volta para hidden (null)
    component.onCellContextMenu(mockEvent, 0, 0);
    expect(component.marks[0][0]).toBeNull();
    expect(component.getCellAppearance(0, 0)).toBe('hidden');
  });

  it('deve retornar o valor correto da célula ao ser revelada', () => {
    component.reveal(0, 1);
    expect(component.getCellValue(0, 1)).toBe('1');
  });

  it('deve encerrar a partida ao revelar uma bomba', () => {
    component.reveal(0, 2); // bomb (-1)
    expect(component.gameOver).toBe(true);
    expect(component.statusTitle).toBe('Você foi explodido');
  });
});
