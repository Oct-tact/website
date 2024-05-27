import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFeesManagementComponent } from './student-fees-management.component';

describe('StudentFeesManagementComponent', () => {
  let component: StudentFeesManagementComponent;
  let fixture: ComponentFixture<StudentFeesManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentFeesManagementComponent]
    });
    fixture = TestBed.createComponent(StudentFeesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
