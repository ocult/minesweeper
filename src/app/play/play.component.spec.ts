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
      display: (x: number, y: number) => ''
    };

    fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create play component and initialize board', () => {
    expect(component).toBeTruthy();
    expect(component.totalBombs).toBe(1);
    expect(component.statusTitle).toBe('Campo minado');
  });

  it('should calculate elapsed time label correctly', () => {
    component.elapsedSeconds = 65;
    expect(component.elapsedTimeLabel).toBe('1min 5s');
  });

  it('should handle cell click and reveal cell', () => {
    const appearance = component.getCellAppearance(0, 0);
    expect(appearance).toBe('hidden');
    component.reveal(0, 0);
    expect(component.revealed[0][0]).toBe(true);
  });
});
