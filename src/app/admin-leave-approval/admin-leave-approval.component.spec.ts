import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeaveApprovalComponent } from './admin-leave-approval.component';

describe('AdminLeaveApprovalComponent', () => {
  let component: AdminLeaveApprovalComponent;
  let fixture: ComponentFixture<AdminLeaveApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminLeaveApprovalComponent]
    });
    fixture = TestBed.createComponent(AdminLeaveApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
