import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllPersonComponent } from './get-all-person.component';

describe('GetAllPersonComponent', () => {
  let component: GetAllPersonComponent;
  let fixture: ComponentFixture<GetAllPersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAllPersonComponent]
    });
    fixture = TestBed.createComponent(GetAllPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
