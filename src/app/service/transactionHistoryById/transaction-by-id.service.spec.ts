import { TestBed } from '@angular/core/testing';

import { TransactionByIdService } from './transaction-by-id.service';

describe('TransactionByIdService', () => {
  let service: TransactionByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
