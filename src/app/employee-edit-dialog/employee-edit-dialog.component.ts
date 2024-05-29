import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentEditDialogComponent } from '../student-edit-dialog/student-edit-dialog.component';

@Component({
  selector: 'app-employee-edit-dialog',
  templateUrl: './employee-edit-dialog.component.html',
  styleUrls: ['./employee-edit-dialog.component.css']
})
export class EmployeeEditDialogComponent {
  editForm!: FormGroup;
  roles: string[] = ['teacher', 'Receptionist', 'Librarian', 'HOD', 'Administrator', 'Domestic Help'];
  genders: string[] = ['Male', 'Female', 'Others'];
  casts: string[] = ['SC', 'ST', 'OBC', 'General'];
  constructor(
    private dialogRef: MatDialogRef<EmployeeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.data.student.name, Validators.required],
      email: [this.data.student.email, [Validators.required, Validators.email]],
      role: [this.data.student.role, Validators.required],
      mobileNumber: [this.data.student.mobileNumber, Validators.required],
      rollNumber: [this.data.student.rollNumber, Validators.required],
      gender: [this.data.student.gender, Validators.required],
      cast: [this.data.student.cast, Validators.required],
      status: [this.data.student.status]
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedStudent = this.editForm.value;
      // Update the student details in local storage
      // Replace the existing student data with the updated data
      const existingData = JSON.parse(localStorage.getItem('employees') || '[]');
      const index = existingData.findIndex((student: any) => student.email === this.data.student.email);
      if (index !== -1) {
        existingData[index] = updatedStudent;
        localStorage.setItem('employees', JSON.stringify(existingData));
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


