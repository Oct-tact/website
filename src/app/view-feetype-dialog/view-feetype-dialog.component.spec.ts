import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeetypeDialogComponent } from './view-feetype-dialog.component';

describe('ViewFeetypeDialogComponent', () => {
  let component: ViewFeetypeDialogComponent;
  let fixture: ComponentFixture<ViewFeetypeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFeetypeDialogComponent]
    });
    fixture = TestBed.createComponent(ViewFeetypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
