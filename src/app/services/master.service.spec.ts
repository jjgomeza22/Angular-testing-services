import { TestBed } from '@angular/core/testing';
import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('valueService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValueService, useValue: spy }
       ]
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });

  // it('should be return a real value from ValueService', () => {
  //   const valueSerivce = new ValueService();
  //   const masterService = new MasterService(valueSerivce);
  //   expect(masterService.getValue()).toBe('my value');
  // });

  // it('should be return a other value from fake service', () => {
  //   const fakeValueSerivce = new FakeValueService();
  //   const masterService = new MasterService(fakeValueSerivce as unknown as ValueService);
  //   expect(masterService.getValue()).toBe('fake value');
  // });

  it('should call getValue from ValueService', () => {
    valueServiceSpy.getValue.and.returnValue('fakeee');
    expect(masterService.getValue()).toBe('fakeee');
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
  });
});
