import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMasterComponent } from './teacher-master.component';

describe('TeacherMasterComponent', () => {
  let component: TeacherMasterComponent;
  let fixture: ComponentFixture<TeacherMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherMasterComponent]
    });
    fixture = TestBed.createComponent(TeacherMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
