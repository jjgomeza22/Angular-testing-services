import { Injectable } from '@angular/core';
import { ValueService } from './value.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(
    private valueSerivce: ValueService
  ) { }

  getValue() {
    return this.valueSerivce.getValue();
  }
}
