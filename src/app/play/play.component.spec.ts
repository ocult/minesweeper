import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayComponent } from './play.component';
import { PlayStateService } from './play-state.service';
import { provideRouter, Router } from '@angular/router';

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

  it('deve redirecionar para /definition no constructor se não houver definição registrada', () => {
    const router = TestBed.inject(Router);
    const spy = vi.spyOn(router, 'navigate');

    playStateService.definition = null;
    TestBed.createComponent(PlayComponent);

    expect(spy).toHaveBeenCalledWith(['/definition']);
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

  it('deve retornar a aparência correta para célula revelada', () => {
    component.reveal(0, 0);
    expect(component.getCellAppearance(0, 0)).toBe('revealed');
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

  it('deve vencer a partida quando todas as células que não são bombas forem reveladas', () => {
    // Revelar todas as células que não são bomba (-1)
    component.reveal(0, 0);
    component.reveal(0, 1);
    component.reveal(1, 0);
    component.reveal(1, 1);
    component.reveal(1, 2);
    component.reveal(2, 0);
    component.reveal(2, 1);
    component.reveal(2, 2);

    expect(component.gameWon).toBe(true);
    expect(component.statusTitle).toBe('Você venceu');
  });

  it('deve ignorar ações (reveal/toggleMark) quando o jogo já estiver encerrado ou vencido', () => {
    component.gameOver = true;
    component.reveal(0, 0);
    component.toggleMark(0, 0);
    expect(component.marks[0][0]).toBeNull();

    component.gameOver = false;
    component.gameWon = true;
    component.reveal(0, 0);
    component.toggleMark(0, 0);
    expect(component.marks[0][0]).toBeNull();
  });

  it('deve cobrir os getters e os estados finais do jogo sem definição e em vitória/derrota', () => {
    playStateService.definition = null;
    expect(component.totalBombs).toBe(0);
    expect(component.flaggedCells).toBe(0);

    component.gameOver = true;
    expect(component.statusTitle).toBe('Você foi explodido');

    component.gameOver = false;
    component.gameWon = true;
    expect(component.statusTitle).toBe('Você venceu');

    component.gameWon = false;
    component.marks[0][0] = 'flag';
    component.marks[0][1] = 'question';
    expect(component.flaggedCells).toBe(1);
    expect(component.getCellAppearance(0, 0)).toBe('flag');
    expect(component.getCellAppearance(0, 1)).toBe('question');
    component.revealed[0][0] = true;
    expect(component.getCellValue(0, 0)).toBe(' ');
  });

  it('deve alternar flag, question e limpar marcação em cada passo do fluxo', () => {
    component.toggleMark(0, 0);
    expect(component.marks[0][0]).toBe('flag');

    component.toggleMark(0, 0);
    expect(component.marks[0][0]).toBe('question');

    component.toggleMark(0, 0);
    expect(component.marks[0][0]).toBeNull();

    component.revealed[0][0] = true;
    component.toggleMark(0, 0);
    expect(component.marks[0][0]).toBeNull();
  });

  it('deve revelar a área vazia ao redor de uma célula sem minas', () => {
    component.reveal(2, 0);

    expect(component.revealed[2][0]).toBe(true);
    expect(component.revealed[2][1]).toBe(true);
    expect(component.revealed[1][1]).toBe(true);
    expect(component.revealed[0][0]).toBe(true);
  });

  it('deve completar a vitória por bandeiras corretas e por todas as células seguras reveladas', () => {
    component.marks[0][2] = 'flag';
    component.revealed = [
      [true, true, false],
      [true, true, true],
      [true, true, true]
    ];
    (component as any).checkVictory();
    expect(component.gameWon).toBe(true);

    component.gameWon = false;
    component.revealed = [
      [true, true, false],
      [true, true, true],
      [true, true, true]
    ];
    component.marks[0][2] = null;
    (component as any).checkVictory();
    expect(component.gameWon).toBe(true);

    component.gameWon = true;
    (component as any).finishVictory();
    expect(component.gameWon).toBe(true);
  });

  it('deve controlar o timer do jogo e limpar o intervalo ao destruir o componente', () => {
    vi.useFakeTimers();

    (component as any).startTimer();
    vi.advanceTimersByTime(1000);
    expect(component.elapsedSeconds).toBe(1);

    component.gameOver = true;
    (component as any).startTimer();
    vi.advanceTimersByTime(2000);
    expect(component.elapsedSeconds).toBe(1);

    component.ngOnDestroy();
    vi.useRealTimers();
  });

  it('deve navegar de volta para a tela de definição em backToDefinition', () => {
    const router = TestBed.inject(Router);
    const spy = vi.spyOn(router, 'navigate');

    component.backToDefinition();

    expect(spy).toHaveBeenCalledWith(['/definition']);
  });

  it('deve reiniciar o estado da partida em reset', () => {
    component.gameOver = true;
    component.reset();

    expect(component.gameOver).toBe(false);
    expect(component.gameWon).toBe(false);
    expect(component.elapsedSeconds).toBe(0);
  });
});
