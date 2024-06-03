import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableFormDialogComponent } from './timetable-form-dialog.component';

describe('TimetableFormDialogComponent', () => {
  let component: TimetableFormDialogComponent;
  let fixture: ComponentFixture<TimetableFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimetableFormDialogComponent]
    });
    fixture = TestBed.createComponent(TimetableFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
