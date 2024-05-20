import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-update-password-dialog',
  templateUrl: './employee-update-password-dialog.component.html',
  styleUrls: ['./employee-update-password-dialog.component.css']
})
export class EmployeeUpdatePasswordDialogComponent {
  updatePasswordForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EmployeeUpdatePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.updatePasswordForm = this.fb.group({
      oldPassword: [{ value: data.student.password, disabled: true }, Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.updatePasswordForm.valid) {
      const newPassword = this.updatePasswordForm.get('newPassword')?.value;
      const confirmNewPassword = this.updatePasswordForm.get('confirmNewPassword')?.value;

      if (newPassword === confirmNewPassword) {
        this.dialogRef.close(newPassword);
      } else {
        alert('New Password and Confirm New Password do not match');
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
