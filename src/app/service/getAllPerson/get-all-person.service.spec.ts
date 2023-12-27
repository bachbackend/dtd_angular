import { TestBed } from '@angular/core/testing';

import { GetAllPersonService } from './get-all-person.service';

describe('GetAllPersonService', () => {
  let service: GetAllPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
