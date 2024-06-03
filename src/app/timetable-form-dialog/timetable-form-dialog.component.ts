
// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-timetable-form-dialog',
//   templateUrl: './timetable-form-dialog.component.html',
//   styleUrls: ['./timetable-form-dialog.component.css']
// })
// export class TimetableFormDialogComponent {
//   form: FormGroup;

//   constructor(
//     public dialogRef: MatDialogRef<TimetableFormDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private fb: FormBuilder
//   ) {
//     this.form = this.fb.group({
//       subject: ['', Validators.required],
//       teacher: ['', Validators.required]
//     });
//   }

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   onSubmit(): void {
//     if (this.form.valid) {
//       this.dialogRef.close(this.form.value);
//     }
//   }
// }


import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface TeacherData {
  name: string;
  class: string;
  section: string;
  subjects: string[];
  status: string;
}

@Component({
  selector: 'app-timetable-form-dialog',
  templateUrl: './timetable-form-dialog.component.html',
  styleUrls: ['./timetable-form-dialog.component.css']
})
export class TimetableFormDialogComponent implements OnInit {
  form: FormGroup;
  teacherData: TeacherData[] = [];
  filteredSubjects: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<TimetableFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      teacher: ['', Validators.required],
      subject: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTeacherData();
  }

  loadTeacherData(): void {
    this.teacherData = JSON.parse(localStorage.getItem('teacherData') || '[]');
  }

  onTeacherChange(teacherName: string): void {
    const selectedTeacher = this.teacherData.find(teacher => teacher.name === teacherName);
    this.filteredSubjects = selectedTeacher ? selectedTeacher.subjects : [];
    this.form.get('subject')?.setValue(''); // Reset subject selection
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
