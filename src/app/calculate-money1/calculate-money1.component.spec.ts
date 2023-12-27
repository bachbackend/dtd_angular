import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateMoney1Component } from './calculate-money1.component';

describe('CalculateMoney1Component', () => {
  let component: CalculateMoney1Component;
  let fixture: ComponentFixture<CalculateMoney1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculateMoney1Component]
    });
    fixture = TestBed.createComponent(CalculateMoney1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
