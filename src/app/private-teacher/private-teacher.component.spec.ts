import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTeacherComponent } from './private-teacher.component';

describe('PrivateTeacherComponent', () => {
  let component: PrivateTeacherComponent;
  let fixture: ComponentFixture<PrivateTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivateTeacherComponent]
    });
    fixture = TestBed.createComponent(PrivateTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
