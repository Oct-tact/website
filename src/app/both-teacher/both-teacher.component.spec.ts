import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BothTeacherComponent } from './both-teacher.component';

describe('BothTeacherComponent', () => {
  let component: BothTeacherComponent;
  let fixture: ComponentFixture<BothTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BothTeacherComponent]
    });
    fixture = TestBed.createComponent(BothTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
