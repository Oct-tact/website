import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentViewDialogComponent } from './student-view-dialog.component';

describe('StudentViewDialogComponent', () => {
  let component: StudentViewDialogComponent;
  let fixture: ComponentFixture<StudentViewDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentViewDialogComponent]
    });
    fixture = TestBed.createComponent(StudentViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
