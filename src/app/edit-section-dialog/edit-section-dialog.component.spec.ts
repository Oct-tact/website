import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSectionDialogComponent } from './edit-section-dialog.component';

describe('EditSectionDialogComponent', () => {
  let component: EditSectionDialogComponent;
  let fixture: ComponentFixture<EditSectionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSectionDialogComponent]
    });
    fixture = TestBed.createComponent(EditSectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
