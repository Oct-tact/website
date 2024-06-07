import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMarksComponent } from './admin-marks.component';

describe('AdminMarksComponent', () => {
  let component: AdminMarksComponent;
  let fixture: ComponentFixture<AdminMarksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMarksComponent]
    });
    fixture = TestBed.createComponent(AdminMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
