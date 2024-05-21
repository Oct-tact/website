import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeesDialogComponent } from './add-fees-dialog.component';

describe('AddFeesDialogComponent', () => {
  let component: AddFeesDialogComponent;
  let fixture: ComponentFixture<AddFeesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFeesDialogComponent]
    });
    fixture = TestBed.createComponent(AddFeesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
