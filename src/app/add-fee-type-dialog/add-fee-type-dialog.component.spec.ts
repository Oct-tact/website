import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeeTypeDialogComponent } from './add-fee-type-dialog.component';

describe('AddFeeTypeDialogComponent', () => {
  let component: AddFeeTypeDialogComponent;
  let fixture: ComponentFixture<AddFeeTypeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFeeTypeDialogComponent]
    });
    fixture = TestBed.createComponent(AddFeeTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
