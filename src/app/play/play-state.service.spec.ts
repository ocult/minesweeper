import { TestBed } from '@angular/core/testing';
import { PlayStateService } from './play-state.service';

describe('PlayStateService', () => {
  let service: PlayStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should hold definition state correctly', () => {
    const mockDef = {
      camp: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, -1, 0],
        [0, 0, 0, 0, 0],
        [0, -1, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ],
      display: (x: number, y: number) => ''
    };
    service.definition = mockDef;
    expect(service.definition).toEqual(mockDef);
  });
});
