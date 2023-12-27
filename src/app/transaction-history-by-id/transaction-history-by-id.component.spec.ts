import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionHistoryByIdComponent } from './transaction-history-by-id.component';

describe('TransactionHistoryByIdComponent', () => {
  let component: TransactionHistoryByIdComponent;
  let fixture: ComponentFixture<TransactionHistoryByIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionHistoryByIdComponent]
    });
    fixture = TestBed.createComponent(TransactionHistoryByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
