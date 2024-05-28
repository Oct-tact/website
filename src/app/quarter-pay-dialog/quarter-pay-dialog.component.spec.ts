import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterPayDialogComponent } from './quarter-pay-dialog.component';

describe('QuarterPayDialogComponent', () => {
  let component: QuarterPayDialogComponent;
  let fixture: ComponentFixture<QuarterPayDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuarterPayDialogComponent]
    });
    fixture = TestBed.createComponent(QuarterPayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
