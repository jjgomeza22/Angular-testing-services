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
});
