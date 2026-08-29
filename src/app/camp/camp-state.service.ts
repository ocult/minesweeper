import { Injectable } from '@angular/core';
import { Bootcamp } from '../camp-definition/bootcamp';

@Injectable({ providedIn: 'root' })
export class CampStateService {
  definition: Bootcamp | null = null;
}
