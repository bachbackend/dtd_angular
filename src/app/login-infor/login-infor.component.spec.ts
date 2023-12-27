import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginInforComponent } from './login-infor.component';

describe('LoginInforComponent', () => {
  let component: LoginInforComponent;
  let fixture: ComponentFixture<LoginInforComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginInforComponent]
    });
    fixture = TestBed.createComponent(LoginInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
