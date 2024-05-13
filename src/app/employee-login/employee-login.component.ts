import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent {
  loginForm: FormGroup;
  employees: any[] = [];
  nextId: number;
  
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  
    // Retrieve existing data from local storage
  
    const existingData = JSON.parse(localStorage.getItem('employees') || '[]');
    this.employees = existingData;
    this.nextId = this.employees.length + 1;
  }
  
  ngOnInit(): void {
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
  
      // Check if the email and password match any existing user
      const existingUser = this.employees.find((user: any) => user.email === formData.email && user.password === formData.password);
      if (existingUser) {
        // Login successful, save user details in local storage
        localStorage.setItem('currentUser', JSON.stringify(existingUser));
        // this.router.navigate(['/employeeregister']);
        this.router.navigate(['/dashboard']);
      } else {
        // Invalid credentials, handle accordingly
        console.log('Invalid email or password');
      }
    } else {
      // Handle invalid form submission
      console.log('Form is invalid');
    }
  }
  }

