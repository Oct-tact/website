
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-timetable-dialog',
  templateUrl: './edit-timetable-dialog.component.html',
  styleUrls: ['./edit-timetable-dialog.component.css']
})
export class EditTimetableDialogComponent implements OnInit {
  editForm: FormGroup;
  teacherOptions: string[] = [];
  subjectOptions: string[] = [];
  teacherSubjectsMap: { [key: string]: string[] } = {};

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditTimetableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editForm = this.fb.group({
      teacher: ['', Validators.required],
      subject: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const teachersData = JSON.parse(localStorage.getItem('teacherData') || '[]');
    this.teacherOptions = teachersData.map((teacher: any) => teacher.name);
    teachersData.forEach((teacher: any) => {
      this.teacherSubjectsMap[teacher.name] = teacher.subjects;
    });

    if (this.data.entry) {
      this.editForm.patchValue({
        teacher: this.data.entry.teacher,
        subject: this.data.entry.subject
      });
      this.onTeacherChange(this.data.entry.teacher);
    }
  }

  onTeacherChange(teacher: string): void {
    this.subjectOptions = this.teacherSubjectsMap[teacher] || [];
  }

  save(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
