
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-register-dialog',
  templateUrl: './employee-register-dialog.component.html',
  styleUrls: ['./employee-register-dialog.component.css']
})
export class EmployeeRegisterDialogComponent {
  registrationForm: FormGroup;
  nextId: number;
  roles: string[] = ['teacher', 'Receptionist', 'Librarian', 'HOD', 'Administrator', 'Domestic Help'];
  genders: string[] = ['Male', 'Female', 'Others'];
  casts: string[] = ['SC', 'ST', 'OBC', 'General'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeRegisterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      gender: ['', Validators.required],
      cast: ['', Validators.required],
      status: ['Active']
    });
    const existingData = JSON.parse(localStorage.getItem('employees') || '[]');
    this.nextId = existingData.length + 1;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      formData.id = this.nextId++;
      formData.rollNumber = 'EM' + this.pad(this.nextId, 3);
        // Set usertype=2 for employee registration
      formData.userType = 2;
      // const existingData = JSON.parse(localStorage.getItem('employees') || '[]');
      // existingData.push(formData);
      // localStorage.setItem('employees', JSON.stringify(existingData));

    
      this.dialogRef.close(formData);
  }}

  private pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}