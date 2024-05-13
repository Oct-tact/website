import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSAttendanceComponent } from './admin-s-attendance.component';

describe('AdminSAttendanceComponent', () => {
  let component: AdminSAttendanceComponent;
  let fixture: ComponentFixture<AdminSAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSAttendanceComponent]
    });
    fixture = TestBed.createComponent(AdminSAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
