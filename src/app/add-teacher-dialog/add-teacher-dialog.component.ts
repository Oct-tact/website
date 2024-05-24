
// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-add-teacher-dialog',
//   templateUrl: './add-teacher-dialog.component.html',
//   styleUrls: ['./add-teacher-dialog.component.css']
// })
// export class AddTeacherDialogComponent implements OnInit {
//   addTeacherForm: FormGroup;
//   classOptions: any[] = [];
//   sectionOptions: string[] = [];

//   constructor(
//     private fb: FormBuilder,
//     public dialogRef: MatDialogRef<AddTeacherDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     this.addTeacherForm = this.fb.group({
//       class: ['', Validators.required],
//       section: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     const sectionData = JSON.parse(localStorage.getItem('sectionData') || '[]');
//     this.classOptions = [...new Set(sectionData.map((item: any) => item.class))];
//   }

//   onClassChange(selectedClass: string): void {
//     const sectionData = JSON.parse(localStorage.getItem('sectionData') || '[]');
//     this.sectionOptions = sectionData
//       .filter((item: any) => item.class === selectedClass)
//       .map((item: any) => item.section);
//   }

//   onSubmit(): void {
//     if (this.addTeacherForm.valid) {
//       this.dialogRef.close(this.addTeacherForm.value);
//     }
//   }

//   onCancel(): void {
//     this.dialogRef.close();
//   }
// }
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-teacher-dialog',
  templateUrl: './add-teacher-dialog.component.html',
  styleUrls: ['./add-teacher-dialog.component.css']
})
export class AddTeacherDialogComponent implements OnInit {
  addTeacherForm: FormGroup;
  classOptions: any[] = [];
  sectionOptions: string[] = [];
  subjectOptions: string[] = [];
  allSubjects: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addTeacherForm = this.fb.group({
      class: ['', Validators.required],
      section: ['', Validators.required],
      subject: ['', Validators.required]  // Add subject form control
    });
  }

  ngOnInit(): void {
    const sectionData = JSON.parse(localStorage.getItem('sectionData') || '[]');
    this.classOptions = [...new Set(sectionData.map((item: any) => item.class))];

    // Load all subjects from local storage
    this.allSubjects = JSON.parse(localStorage.getItem('subjectData') || '[]');
  }

  onClassChange(selectedClass: string): void {
    const sectionData = JSON.parse(localStorage.getItem('sectionData') || '[]');
    this.sectionOptions = sectionData
      .filter((item: any) => item.class === selectedClass)
      .map((item: any) => item.section);

    // Filter subjects based on selected class
    this.subjectOptions = this.allSubjects
      .filter(subject => subject.class === selectedClass)
      .map(subject => subject.subject);
  }

  onSubmit(): void {
    if (this.addTeacherForm.valid) {
      this.dialogRef.close(this.addTeacherForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
