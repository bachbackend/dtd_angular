import { TestBed } from '@angular/core/testing';

import { TransactionTestService } from './transaction-test.service';

describe('TransactionTestService', () => {
  let service: TransactionTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
