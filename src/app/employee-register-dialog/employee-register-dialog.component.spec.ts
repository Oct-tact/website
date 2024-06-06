import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRegisterDialogComponent } from './employee-register-dialog.component';

describe('EmployeeRegisterDialogComponent', () => {
  let component: EmployeeRegisterDialogComponent;
  let fixture: ComponentFixture<EmployeeRegisterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeRegisterDialogComponent]
    });
    fixture = TestBed.createComponent(EmployeeRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
