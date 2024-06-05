import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTimetableeeDialogComponent } from './delete-timetableee-dialog.component';

describe('DeleteTimetableeeDialogComponent', () => {
  let component: DeleteTimetableeeDialogComponent;
  let fixture: ComponentFixture<DeleteTimetableeeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTimetableeeDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteTimetableeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
