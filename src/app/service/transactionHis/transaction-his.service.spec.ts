import { TestBed } from '@angular/core/testing';

import { TransactionHisService } from './transaction-his.service';

describe('TransactionHisService', () => {
  let service: TransactionHisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionHisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
