import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeeTypeDialogComponent } from './edit-fee-type-dialog.component';

describe('EditFeeTypeDialogComponent', () => {
  let component: EditFeeTypeDialogComponent;
  let fixture: ComponentFixture<EditFeeTypeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFeeTypeDialogComponent]
    });
    fixture = TestBed.createComponent(EditFeeTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
