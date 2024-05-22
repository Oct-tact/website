
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-subject-dialog',
  templateUrl: './edit-subject-dialog.component.html',
  styleUrls: ['./edit-subject-dialog.component.css']
})
export class EditSubjectDialogComponent implements OnInit {
  subjectForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditSubjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.subjectForm = this.fb.group({
      subject: [data.subject, [Validators.required, Validators.maxLength(50)]],
      class: [data.class, [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onUpdateClick(): void {
    if (this.subjectForm.valid) {
      const updatedData = { ...this.data, ...this.subjectForm.value };
      this.dialogRef.close(updatedData);
    }
  }
}

