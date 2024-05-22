import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubjectDialogComponent } from './edit-subject-dialog.component';

describe('EditSubjectDialogComponent', () => {
  let component: EditSubjectDialogComponent;
  let fixture: ComponentFixture<EditSubjectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSubjectDialogComponent]
    });
    fixture = TestBed.createComponent(EditSubjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
