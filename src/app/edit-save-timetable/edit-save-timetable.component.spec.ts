import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSaveTimetableComponent } from './edit-save-timetable.component';

describe('EditSaveTimetableComponent', () => {
  let component: EditSaveTimetableComponent;
  let fixture: ComponentFixture<EditSaveTimetableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSaveTimetableComponent]
    });
    fixture = TestBed.createComponent(EditSaveTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
