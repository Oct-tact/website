import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-student-update-password-dialog',
  templateUrl: './student-update-password-dialog.component.html',
  styleUrls: ['./student-update-password-dialog.component.css']
})
export class StudentUpdatePasswordDialogComponent {

  updatePasswordForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<StudentUpdatePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { oldPassword: string },
    private fb: FormBuilder
  ) {
    this.updatePasswordForm = this.fb.group({
      oldPassword: [data.oldPassword, Validators.required],
      newPassword: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.updatePasswordForm.valid) {
      const newPassword = this.updatePasswordForm.value.newPassword;
      // You can handle updating the password here
      console.log('New Password:', newPassword);
      this.dialogRef.close(newPassword);
    } else {
      // Handle invalid form submission
    }
  }
}