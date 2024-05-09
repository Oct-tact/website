import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDeleteDialogComponent } from './student-delete-dialog.component';

describe('StudentDeleteDialogComponent', () => {
  let component: StudentDeleteDialogComponent;
  let fixture: ComponentFixture<StudentDeleteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentDeleteDialogComponent]
    });
    fixture = TestBed.createComponent(StudentDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
