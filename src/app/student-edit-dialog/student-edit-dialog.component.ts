import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-edit-dialog',
  templateUrl: './student-edit-dialog.component.html',
  styleUrls: ['./student-edit-dialog.component.css']
})
export class StudentEditDialogComponent {

  editForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<StudentEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.data.student.name, Validators.required],
      email: [this.data.student.email, [Validators.required, Validators.email]],
      grade: [this.data.student.grade, Validators.required],
      parentContact: [this.data.student.parentContact, Validators.required],
      rollNumber: [this.data.student.rollNumber, Validators.required],
      gender: [this.data.student.gender, Validators.required], // New field
      cast: [this.data.student.cast, Validators.required] // New field
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedStudent = this.editForm.value;
      // Update the student details in local storage
      // Replace the existing student data with the updated data
      const existingData = JSON.parse(localStorage.getItem('students') || '[]');
      const index = existingData.findIndex((student: any) => student.email === this.data.student.email);
      if (index !== -1) {
        existingData[index] = updatedStudent;
        localStorage.setItem('students', JSON.stringify(existingData));
      }
      // Close the dialog
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    // Close the dialog without saving changes
    this.dialogRef.close();
  }
}
