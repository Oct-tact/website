import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  isAdmin: boolean = false;
  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      
      // Check if the entered email and password match admin credentials
      if (formData.email === 'admin@gmail.com' && formData.password === '1234') {
        // Admin authenticated, set user type as 0 in local storage
        this.isAdmin = true;
        localStorage.setItem('currentddUser', JSON.stringify({ email: formData.email,password: formData.password, userType: 0 }));
        // Redirect to admin user management page or dashboard
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

