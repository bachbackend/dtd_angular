import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHistoryComponent } from './update-history.component';

describe('UpdateHistoryComponent', () => {
  let component: UpdateHistoryComponent;
  let fixture: ComponentFixture<UpdateHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateHistoryComponent]
    });
    fixture = TestBed.createComponent(UpdateHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
