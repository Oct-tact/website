import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent {
//   loginForm: FormGroup;
//   nextId: number;

//   constructor(private fb: FormBuilder, private router: Router) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });

//     // Initialize nextId based on existing data
//     const existingData = JSON.parse(localStorage.getItem('students') || '[]');
//     this.nextId = existingData.length + 1;
//   }

//   ngOnInit(): void {
//   }

//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       const formData = this.loginForm.value;

//       // Retrieve existing data from local storage
//       const existingData = JSON.parse(localStorage.getItem('students') || '[]');

//       // Check if the email and password match any existing user
//       const existingUser = existingData.find((user: any) => user.email === formData.email && user.password === formData.password);
//       if (existingUser) {
//         // Login successful, navigate to the stulogin path
//         this.router.navigate(['/sturegister']);
//       } else {
//         // Invalid credentials, handle accordingly
//         console.log('Invalid email or password');
//       }
//     } else {
//       // Handle invalid form submission
//       console.log('Form is invalid');
//     }
//   }
// }
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
}

onSubmit(): void {
  if (this.loginForm.valid) {
    const formData = this.loginForm.value;

    // Check if the email and password match any existing user
    const existingUser = this.students.find((user: any) => user.email === formData.email && user.password === formData.password);
    if (existingUser) {
      // Login successful, save user details in local storage
      localStorage.setItem('currentUser', JSON.stringify(existingUser));
      // this.router.navigate(['/sturegister']);
      this.router.navigate(['/dashboard/dailyatt']);
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
