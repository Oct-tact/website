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
  currentUser:any;
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
     // Clear attendance records upon component initialization
   localStorage.removeItem('attendanceRecords');
   const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
   if (storedUser && storedUser.id) {
     this.currentUser = storedUser;
     const userRecordsKey = `attendanceRecords_${this.currentUser.rollNumber}`;
     const currentUserRecords = JSON.parse(localStorage.getItem(userRecordsKey) || '[]');
     // Display existing attendance records
     console.log("Existing attendance records for user:", currentUserRecords);
   }
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
  
      // Check if the email and password match any existing user
      const existingUser = this.employees.find((user: any) => user.email === formData.email && user.password === formData.password);
      if (existingUser) {
        existingUser.userType = 2;
        // Clear attendance records if a new user is logged in
        if (!this.currentUser || this.currentUser.id !== existingUser.id) {
          localStorage.removeItem('attendanceRecords');
        }
    
      // Login successful, save user details in local storage
      this.currentUser = existingUser;
        localStorage.setItem('currentUser', JSON.stringify(existingUser));
        // this.router.navigate(['/employeeregister']);
        this.router.navigate(['/dashboard/employeeatt']);
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

