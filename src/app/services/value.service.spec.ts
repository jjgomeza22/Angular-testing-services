import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    service = new ValueService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Test for getValue', () => {
    it('should return a value', () => {
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('Test for setValue', () => {
    it('should set a value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
      expect(service.getValue()).toBe('change');
    });
  });

  describe('Test for getPromise', () => {
    it('should return promise value from Promise', (doneFn) => {
      service.getPromiseValue()
      .then((value) => {
        expect(value).toBe('promise value');
        doneFn();
      })
    });

    it('should return promise value from Promise other way', async () => {
      const rta = await service.getPromiseValue();
      expect(rta).toBe('promise value');
    });
  });

  describe('Test for getObservableValue', () => {
    it('should set a value', (doneFn) => {
      service.getObservableValue()
      .subscribe((value) => {
        expect(value).toBe('obs value');
        doneFn();
      });
    });
  });

});
