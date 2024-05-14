import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent {
  currentUser: any;
loginForm: FormGroup;
students: any[] = [];
nextId: number;

constructor(private fb: FormBuilder, private router: Router) {
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  // Retrieve existing data from local storage
  const existingData = JSON.parse(localStorage.getItem('students') || '[]');
  this.students = existingData;
  this.nextId = this.students.length + 1;
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
    const existingUser = this.students.find((user: any) => user.email === formData.email && user.password === formData.password);
    if (existingUser) {
         // Clear attendance records if a new user is logged in
         if (!this.currentUser || this.currentUser.id !== existingUser.id) {
          localStorage.removeItem('attendanceRecords');
        }
        existingUser.userType = 1; // UserType 1 indicates a student
        existingUser.isLoggedIn = true;
      // Login successful, save user details in local storage
      this.currentUser = existingUser;
      localStorage.setItem('currentUser', JSON.stringify(existingUser));
      // this.router.navigate(['/sturegister']);
      this.router.navigate(['/dashboard/stuatt']);
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


