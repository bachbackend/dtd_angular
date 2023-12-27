import { TestBed } from '@angular/core/testing';

import { LoginInforService } from './login-infor.service';

describe('LoginInforService', () => {
  let service: LoginInforService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginInforService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
