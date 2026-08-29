export type MinefieldAppearance = 'hidden' | 'flag' | 'question' | 'revealed' | 'bomb';
export type MinefieldMark = 'flag' | 'question' | null;
export type MinefieldMatrix = number[][];
export type MinefieldCellPosition = { x: number; y: number };

export interface MinefieldBoardDefinition {
  camp: MinefieldMatrix;
  display(x: number, y: number): string;
}
