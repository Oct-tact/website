import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeetypeDialogComponent } from './feetype-dialog.component';

describe('FeetypeDialogComponent', () => {
  let component: FeetypeDialogComponent;
  let fixture: ComponentFixture<FeetypeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeetypeDialogComponent]
    });
    fixture = TestBed.createComponent(FeetypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
