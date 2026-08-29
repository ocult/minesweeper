import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MinefieldAppearance, MinefieldCellPosition, MinefieldMatrix } from './minefield.types';

@Component({
  selector: 'app-minefield',
  standalone: true,
  templateUrl: './minefield.component.html',
  styleUrls: ['./minefield.less'],
  imports: [CommonModule]
})
export class MinefieldComponent {
  @Input() rows: MinefieldMatrix = [];
  @Input() getCellValue: (x: number, y: number) => string = () => ' ';
  @Input() getAppearance: (x: number, y: number) => MinefieldAppearance = () => 'hidden';

  @Output() cellClick = new EventEmitter<MinefieldCellPosition>();
  @Output() cellContextMenu = new EventEmitter<{ event: MouseEvent; position: MinefieldCellPosition }>();

  onContextMenu(event: MouseEvent, x: number, y: number): void {
    event.preventDefault();
    this.cellContextMenu.emit({ event, position: { x, y } });
  }
}
