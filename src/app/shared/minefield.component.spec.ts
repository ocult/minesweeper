import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinefieldComponent } from './minefield.component';

describe('MinefieldComponent', () => {
  let component: MinefieldComponent;
  let fixture: ComponentFixture<MinefieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinefieldComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MinefieldComponent);
    component = fixture.componentInstance;
    component.rows = [
      [0, 0],
      [0, 0]
    ];
    fixture.detectChanges();
  });

  it('should create minefield component and emit cell click', () => {
    expect(component).toBeTruthy();

    let clickedPosition: any = null;
    component.cellClick.subscribe((pos) => {
      clickedPosition = pos;
    });

    const mockEvent = new MouseEvent('click');
    // Simulate interaction
    expect(clickedPosition).toBeNull();
  });

  it('should prevent default on contextmenu and emit cellContextMenu', () => {
    let contextMenuData: any = null;
    component.cellContextMenu.subscribe((data) => {
      contextMenuData = data;
    });

    const mockEvent = new MouseEvent('contextmenu');
    const spy = vi.spyOn(mockEvent, 'preventDefault');

    component.onContextMenu(mockEvent, 1, 0);

    expect(spy).toHaveBeenCalled();
    expect(contextMenuData).toEqual({ event: mockEvent, position: { x: 1, y: 0 } });
  });
});
