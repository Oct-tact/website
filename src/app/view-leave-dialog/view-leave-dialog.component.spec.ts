import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaveDialogComponent } from './view-leave-dialog.component';

describe('ViewLeaveDialogComponent', () => {
  let component: ViewLeaveDialogComponent;
  let fixture: ComponentFixture<ViewLeaveDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewLeaveDialogComponent]
    });
    fixture = TestBed.createComponent(ViewLeaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
