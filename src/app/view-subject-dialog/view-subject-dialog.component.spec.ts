import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubjectDialogComponent } from './view-subject-dialog.component';

describe('ViewSubjectDialogComponent', () => {
  let component: ViewSubjectDialogComponent;
  let fixture: ComponentFixture<ViewSubjectDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSubjectDialogComponent]
    });
    fixture = TestBed.createComponent(ViewSubjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
