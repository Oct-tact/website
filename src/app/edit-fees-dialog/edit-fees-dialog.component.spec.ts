import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFeesDialogComponent } from './edit-fees-dialog.component';

describe('EditFeesDialogComponent', () => {
  let component: EditFeesDialogComponent;
  let fixture: ComponentFixture<EditFeesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFeesDialogComponent]
    });
    fixture = TestBed.createComponent(EditFeesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
