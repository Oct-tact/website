import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestDialogComponent } from './leave-request-dialog.component';

describe('LeaveRequestDialogComponent', () => {
  let component: LeaveRequestDialogComponent;
  let fixture: ComponentFixture<LeaveRequestDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveRequestDialogComponent]
    });
    fixture = TestBed.createComponent(LeaveRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
