import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeAttendanceComponent } from './admin-employee-attendance.component';

describe('AdminEmployeeAttendanceComponent', () => {
  let component: AdminEmployeeAttendanceComponent;
  let fixture: ComponentFixture<AdminEmployeeAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEmployeeAttendanceComponent]
    });
    fixture = TestBed.createComponent(AdminEmployeeAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
