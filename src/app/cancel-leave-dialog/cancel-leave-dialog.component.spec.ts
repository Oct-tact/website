import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelLeaveDialogComponent } from './cancel-leave-dialog.component';

describe('CancelLeaveDialogComponent', () => {
  let component: CancelLeaveDialogComponent;
  let fixture: ComponentFixture<CancelLeaveDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelLeaveDialogComponent]
    });
    fixture = TestBed.createComponent(CancelLeaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
