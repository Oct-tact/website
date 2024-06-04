import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTimetableDialogComponent } from './delete-timetable-dialog.component';

describe('DeleteTimetableDialogComponent', () => {
  let component: DeleteTimetableDialogComponent;
  let fixture: ComponentFixture<DeleteTimetableDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTimetableDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteTimetableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
