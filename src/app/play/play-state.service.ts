import { Injectable } from '@angular/core';
import { MinefieldBoardDefinition } from '../shared/minefield.types';

@Injectable({ providedIn: 'root' })
export class PlayStateService {
  definition: MinefieldBoardDefinition | null = null;
}
