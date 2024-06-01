import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeetypeDialogComponent } from './edit-feetype-dialog.component';

describe('EditFeetypeDialogComponent', () => {
  let component: EditFeetypeDialogComponent;
  let fixture: ComponentFixture<EditFeetypeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFeetypeDialogComponent]
    });
    fixture = TestBed.createComponent(EditFeetypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
