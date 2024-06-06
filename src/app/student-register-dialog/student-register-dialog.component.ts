


import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-register-dialog',
  templateUrl: './student-register-dialog.component.html',
  styleUrls: ['./student-register-dialog.component.css']
})
export class StudentRegisterDialogComponent {
  registrationForm: FormGroup;
  nextId: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<StudentRegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      class: ['', Validators.required],
      section: ['', Validators.required],
      dob: ['', Validators.required],
      parentContact: ['', Validators.required],
      rollNumber: ['',],
      gender: ['', Validators.required],
      cast: ['', Validators.required],
      status: ['Active']
    });

    // Initialize nextId based on existing data
    const existingData = JSON.parse(localStorage.getItem('students') || '[]');
    this.nextId = existingData.length + 1;
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      formData.id = this.nextId++;
      formData.rollNumber = 'SM' + this.pad(this.nextId, 3);

      // Retrieve existing data from local storage
      const existingData = JSON.parse(localStorage.getItem('students') || '[]');
      existingData.push(formData);

      // Save updated data to local storage
      localStorage.setItem('students', JSON.stringify(existingData));

      this.dialogRef.close(true);
    }
  }

  private pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }
}
