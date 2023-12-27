import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateMoney2Component } from './calculate-money2.component';

describe('CalculateMoney2Component', () => {
  let component: CalculateMoney2Component;
  let fixture: ComponentFixture<CalculateMoney2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculateMoney2Component]
    });
    fixture = TestBed.createComponent(CalculateMoney2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
