import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSectionDialogComponent } from './view-section-dialog.component';

describe('ViewSectionDialogComponent', () => {
  let component: ViewSectionDialogComponent;
  let fixture: ComponentFixture<ViewSectionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSectionDialogComponent]
    });
    fixture = TestBed.createComponent(ViewSectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
