import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent {
  registrationForm: FormGroup;
  nextId: number;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', Validators.required],
      mobileNumber: ['', Validators.required]
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
      const existingData = JSON.parse(localStorage.getItem('employees') || '[]');
      existingData.push(formData);
      localStorage.setItem('employees', JSON.stringify(existingData));

      this.registrationForm.reset();
      this.router.navigate(['/employeelogin']);
    } else {
      // Handle invalid form submission
    }
  }

  private pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }
}

