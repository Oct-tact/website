import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusConfirmationDialogComponent } from './status-confirmation-dialog.component';

describe('StatusConfirmationDialogComponent', () => {
  let component: StatusConfirmationDialogComponent;
  let fixture: ComponentFixture<StatusConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(StatusConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
