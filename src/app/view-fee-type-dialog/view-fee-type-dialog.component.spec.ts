import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeeTypeDialogComponent } from './view-fee-type-dialog.component';

describe('ViewFeeTypeDialogComponent', () => {
  let component: ViewFeeTypeDialogComponent;
  let fixture: ComponentFixture<ViewFeeTypeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFeeTypeDialogComponent]
    });
    fixture = TestBed.createComponent(ViewFeeTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
