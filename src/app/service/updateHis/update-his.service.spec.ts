import { TestBed } from '@angular/core/testing';

import { UpdateHisService } from './update-his.service';

describe('UpdateHisService', () => {
  let service: UpdateHisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateHisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
