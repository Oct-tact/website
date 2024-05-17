import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLeaveComponent } from './student-leave.component';

describe('StudentLeaveComponent', () => {
  let component: StudentLeaveComponent;
  let fixture: ComponentFixture<StudentLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentLeaveComponent]
    });
    fixture = TestBed.createComponent(StudentLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
