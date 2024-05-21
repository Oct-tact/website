import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeesDialogComponent } from './view-fees-dialog.component';

describe('ViewFeesDialogComponent', () => {
  let component: ViewFeesDialogComponent;
  let fixture: ComponentFixture<ViewFeesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFeesDialogComponent]
    });
    fixture = TestBed.createComponent(ViewFeesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
