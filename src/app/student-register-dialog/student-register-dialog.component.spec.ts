import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRegisterDialogComponent } from './student-register-dialog.component';

describe('StudentRegisterDialogComponent', () => {
  let component: StudentRegisterDialogComponent;
  let fixture: ComponentFixture<StudentRegisterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRegisterDialogComponent]
    });
    fixture = TestBed.createComponent(StudentRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
