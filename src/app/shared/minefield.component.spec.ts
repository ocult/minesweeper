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

  it('deve criar o componente minefield e lidar com contexto e valores padrão', () => {
    expect(component).toBeTruthy();
    expect(component.getCellValue(0, 0)).toBe(' ');
    expect(component.getAppearance(0, 0)).toBe('hidden');
  });

  it('deve prevenir o comportamento padrão no contextmenu e emitir cellContextMenu', () => {
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
