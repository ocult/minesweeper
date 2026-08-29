import { Bootcamp } from './bootcamp';

describe('Bootcamp object', () => {
  it('Dado duas dimensões x e y, deve ser criada uma matriz de dimensões x e y com zeros ', () => {
    const x = 2;
    const y = 2;
    const result = new Bootcamp(x, y);
    const expected = [[0, 0], [0, 0]];
    expect(result.camp).toEqual(expected);
  });

  it('Dado um campo 2x2. Quando setar uma bomba na posição 0,1, esta deve retornar -1', () => {
    const x = 2;
    const y = 2;
    const bootcamp = new Bootcamp(x, y);
    bootcamp.setBomb(0, 1);
    expect(bootcamp.camp[0][1]).toEqual(-1);
  });

  it('Dado um campo 2x2. Quando setar uma bomba na posição 0,0, o campo deve retornar [[-1,1],[1,1]]', () => {
    const x = 2;
    const y = 2;
    const bootcamp = new Bootcamp(x, y);
    bootcamp.setBomb(0, 0);
    expect(bootcamp.camp).toEqual([[-1, 1], [1, 1]]);
  });

  it('Dado um campo 2x2. Quando setar uma bomba na posição 1,1, o campo deve retornar [[1,1],[1,-1]]', () => {
    const x = 2;
    const y = 2;
    const bootcamp = new Bootcamp(x, y);
    bootcamp.setBomb(1, 1);
    expect(bootcamp.camp).toEqual([[1, 1], [1, -1]]);
  });

  it(`Dado um campo 3x3. Quando setar uma bomba na posição 0,0;o campo deve retornar [
    [-1,1,0],
    [1,1,0],
    [0,0,0]
  ]`, () => {
      const x = 3;
      const y = 3;
      const bootcamp = new Bootcamp(x, y);
      bootcamp.setBomb(0, 0);
      expect(bootcamp.camp).toEqual([[-1, 1, 0], [1, 1, 0], [0, 0, 0]]);
    });

  it(`Dado um campo 3x3. Quando setar uma bomba na posição 1,1;o campo deve retornar [
      [1,1,1],
      [1,-1,1],
      [1,1,1]
    ]`, () => {
      const x = 3;
      const y = 3;
      const bootcamp = new Bootcamp(x, y);
      bootcamp.setBomb(1, 1);
      expect(bootcamp.camp).toEqual([[1, 1, 1], [1, -1, 1], [1, 1, 1]]);
    });

  it(`Dado um campo 5x5. Quando setar uma bomba na posição 1,1;o campo deve retornar [
        [1,1,1,0,0],
        [1,-1,1,0,0],
        [1,1,1,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ]`, () => {
      const x = 5;
      const y = 5;
      const bootcamp = new Bootcamp(x, y);
      bootcamp.setBomb(1, 1);
      expect(bootcamp.camp).toEqual([
        [1, 1, 1, 0, 0],
        [1, -1, 1, 0, 0],
        [1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ]);
    });

  it(`Dado um campo 5x5. Quando setar uma bomba na posição 1,1 e outra 1,2;o campo deve retornar [
      [1, 2, 2,1,0],
      [1,-1,-1,1,0],
      [1, 2, 2,1,0],
      [0, 0, 0,0,0],
      [0, 0, 0,0,0]
    ]`, () => {
      const x = 5;
      const y = 5;
      const bootcamp = new Bootcamp(x, y);
      bootcamp.setBomb(1, 1);
      bootcamp.setBomb(1, 2);
      expect(bootcamp.camp).toEqual([
        [1, 2, 2, 1, 0],
        [1, -1, -1, 1, 0],
        [1, 2, 2, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ]);
    });

  it('Dado um campo 1x1, aumentar para 2x1', () => {
    const bootcamp = new Bootcamp(1, 1);
    bootcamp.x = 2;
    expect(bootcamp.x).toEqual(2);
    expect(bootcamp.y).toEqual(1);
  });

  it('Dado um campo 2x1, aumentar para 4x1', () => {
    const bootcamp = new Bootcamp(2, 1);
    bootcamp.x = 4;
    expect(bootcamp.x).toEqual(4);
    expect(bootcamp.y).toEqual(1);
  });

  it('Dado um campo 4x1, diminuir para 2x1', () => {
    const bootcamp = new Bootcamp(4, 1);
    bootcamp.x = 2;
    expect(bootcamp.x).toEqual(2);
    expect(bootcamp.y).toEqual(1);
  });

  it('Dado um campo 1x1, aumentar para 1x2', () => {
    const bootcamp = new Bootcamp(1, 1);
    bootcamp.y = 2;
    expect(bootcamp.x).toEqual(1);
    expect(bootcamp.y).toEqual(2);
  });

  it('Dado um campo 1x2, aumentar para 1x4', () => {
    const bootcamp = new Bootcamp(1, 2);
    bootcamp.y = 4;
    expect(bootcamp.x).toEqual(1);
    expect(bootcamp.y).toEqual(4);
  });

  it('Dado um campo 1x4, aumentar para 1x2', () => {
    const bootcamp = new Bootcamp(1, 4);
    bootcamp.y = 2;
    expect(bootcamp.x).toEqual(1);
    expect(bootcamp.y).toEqual(2);
  });

  it('Dado um campo 3x3, aumentar para 5x5', () => {
    const bootcamp = new Bootcamp(3, 3);
    bootcamp.x = 5;
    bootcamp.y = 5;
    expect(bootcamp.x).toEqual(5);
    expect(bootcamp.y).toEqual(5);
  });

  it(`Dado um campo 2x2, aumentar para 5x5 e colocar uma bomba em 1,1, retornar [
    [1, 1, 1,0,0],
    [1,-1, 1,0,0],
    [1, 1, 1,0,0],
    [0, 0, 0,0,0],
    [0, 0, 0,0,0]
  ]`, () => {
      const bootcamp = new Bootcamp(2, 2);
      bootcamp.x = 5;
      bootcamp.y = 5;
      bootcamp.setBomb(1, 1);
      expect(bootcamp.camp).toEqual([
        [1, 1, 1, 0, 0],
        [1, -1, 1, 0, 0],
        [1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ]);
    });

  describe('Testes de visualização Dado um campo 5x5, com bomba em 1,1', () => {
    let bootcamp: Bootcamp;
    beforeEach(() => {
      bootcamp = new Bootcamp(5, 5);
      bootcamp.setBomb(1, 1);
      expect(bootcamp.camp).toEqual([
        [1, 1, 1, 0, 0],
        [1, -1, 1, 0, 0],
        [1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ]);
    });
    it('Mostrar a posição 0,0 como 1', () => {
      expect(bootcamp.display(0, 0)).toEqual('1');
    });
    it('Mostrar a posição 0,3 como espaço vazio', () => {
      expect(bootcamp.display(0, 3)).toEqual(' ');
    });
    it('Mostrar a posição 1,1 como *', () => {
      expect(bootcamp.display(1, 1)).toEqual('*');
    });
  });

  it('Dado um campo 2x2, definir uma bomba 0x0 e desfazer a ação, retornar campo vazio', () => {
    const bootcamp = new Bootcamp(2, 2);
    bootcamp.changeBomb(0, 0);
    expect(bootcamp.camp).toEqual([[-1, 1], [1, 1]]);
    bootcamp.changeBomb(0, 0);
    expect(bootcamp.camp).toEqual([[0, 0], [0, 0]]);
    return bootcamp;
  });
});
