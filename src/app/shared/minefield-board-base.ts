import { MinefieldAppearance, MinefieldBoardDefinition, MinefieldMark } from './minefield.types';

export abstract class MinefieldBoardBase {
  protected getBoardValue(board: MinefieldBoardDefinition | null, x: number, y: number): string {
    const value = board?.display(x, y) ?? ' ';
    return value === ' ' ? ' ' : value;
  }

  protected getHiddenAppearance(mark: MinefieldMark): MinefieldAppearance {
    if (mark === 'flag') {
      return 'flag';
    }

    if (mark === 'question') {
      return 'question';
    }

    return 'hidden';
  }

  protected getRevealedAppearance(board: MinefieldBoardDefinition | null, x: number, y: number): MinefieldAppearance {
    if (board?.camp[x][y] === -1) {
      return 'bomb';
    }

    return 'revealed';
  }
}
