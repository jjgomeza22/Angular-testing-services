import { FakeValueService } from './fake-value.service';
import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  it('should be return a real value from ValueService', () => {
    const valueSerivce = new ValueService();
    const masterService = new MasterService(valueSerivce);
    expect(masterService.getValue()).toBe('my value');
  });

  it('should be return a other value from fake service', () => {
    const fakeValueSerivce = new FakeValueService();
    const masterService = new MasterService(fakeValueSerivce as unknown as ValueService);
    expect(masterService.getValue()).toBe('fake value');
  });

  it('should call getValue from ValueService', () => {
    const valueServiceSpy = jasmine.createSpyObj<ValueService>('ValueService', ['getValue']);
    valueServiceSpy.getValue.and.returnValue('fakeee');
    const masterService = new MasterService(valueServiceSpy);
    expect(masterService.getValue()).toBe('fakeee');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
  });
});
