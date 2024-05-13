import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUpdatePasswordDialogComponent } from './student-update-password-dialog.component';

describe('StudentUpdatePasswordDialogComponent', () => {
  let component: StudentUpdatePasswordDialogComponent;
  let fixture: ComponentFixture<StudentUpdatePasswordDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentUpdatePasswordDialogComponent]
    });
    fixture = TestBed.createComponent(StudentUpdatePasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
