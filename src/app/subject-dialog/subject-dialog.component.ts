

// import { Component, Inject, OnInit } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// export interface SubjectData {
//   sno: number;
//   subject: string;
//   class: string;
//   status: 'Active' | 'Inactive'; // Add the status property
// }

// @Component({
//   selector: 'app-subject-dialog',
//   templateUrl: './subject-dialog.component.html',
//   styleUrls: ['./subject-dialog.component.css']
// })
// export class SubjectDialogComponent implements OnInit {
//   subjectForm: FormGroup;

//   constructor(
//     public dialogRef: MatDialogRef<SubjectDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: SubjectData,
//     private fb: FormBuilder
//   ) {
//     this.subjectForm = this.fb.group({
//       subject: ['', [Validators.required, Validators.maxLength(50)]],
//       class: ['', [Validators.required, Validators.maxLength(50)]]
//     });
//   }

//   ngOnInit(): void {}

//   onCancelClick(): void {
//     this.dialogRef.close();
//   }

//   onAddClick(): void {
//     if (this.subjectForm.valid) {
//       this.dialogRef.close(this.subjectForm.value);
//     }
//   }
// }
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface SubjectData {
  sno: number;
  subject: string;
  class: string;
  status: 'Active' | 'Inactive'; // Add the status property
}

@Component({
  selector: 'app-subject-dialog',
  templateUrl: './subject-dialog.component.html',
  styleUrls: ['./subject-dialog.component.css']
})
export class SubjectDialogComponent implements OnInit {
  subjectForm: FormGroup;
  classes: string[] = ['KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 
                       'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 
                       'Class XI', 'Class XII'];

  constructor(
    public dialogRef: MatDialogRef<SubjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SubjectData,
    private fb: FormBuilder
  ) {
    this.subjectForm = this.fb.group({
      subject: ['', [Validators.required, Validators.maxLength(50)]],
      class: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    if (this.subjectForm.valid) {
      this.dialogRef.close(this.subjectForm.value);
    }
  }
}
