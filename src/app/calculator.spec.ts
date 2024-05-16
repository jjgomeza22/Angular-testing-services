import { Calculator } from './calculator';

describe('Test for Calculator', () => {
  it('#multiply should a nine', () => {
    //AAA
    //Arrange
    const calculator = new Calculator();
    //Act
    const rta = calculator.multiply(3, 3);
    //Assert
    expect(rta).toEqual(9);
  });

  it('#multiply should be a four', () => {
    const calculator = new Calculator();
    const rta = calculator.multiply(1, 4);
    expect(rta).toEqual(4);
  });

  it('#divide should be a some numbers', () => {
    const calculator = new Calculator();
    expect(calculator.divide(6, 3)).toEqual(2);
    expect(calculator.divide(5, 2)).toEqual(2.5);
  });

  it('#test matchers', () => {
    const name = 'Juan';
    let name2;

    expect(name).toBeDefined();
    expect(name2).toBeUndefined();

    expect(1 + 3 === 4).toBeTruthy();
    expect(1 + 1 === 3).toBeFalsy();

    expect(5).toBeLessThan(10);
    expect(20).toBeGreaterThan(10);

    expect('123456').toMatch(/123/);
    expect(['apples', 'oranges', 'pears']).toContain('oranges');
  });
});
