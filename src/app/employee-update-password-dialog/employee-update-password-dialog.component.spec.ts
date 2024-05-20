import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUpdatePasswordDialogComponent } from './employee-update-password-dialog.component';

describe('EmployeeUpdatePasswordDialogComponent', () => {
  let component: EmployeeUpdatePasswordDialogComponent;
  let fixture: ComponentFixture<EmployeeUpdatePasswordDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeUpdatePasswordDialogComponent]
    });
    fixture = TestBed.createComponent(EmployeeUpdatePasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
