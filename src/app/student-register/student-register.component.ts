import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent {
  registrationForm: FormGroup;
  nextId: number;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      grade: ['', Validators.required],
      dob: ['', Validators.required],
      parentContact: ['', Validators.required]
    });

    // Initialize nextId based on existing data
    const existingData = JSON.parse(localStorage.getItem('students') || '[]');
    this.nextId = existingData.length + 1;
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      formData.id = this.nextId++;

      // Retrieve existing data from local storage
      const existingData = JSON.parse(localStorage.getItem('students') || '[]');

      // Append new data
      existingData.push(formData);

      // Save updated data to local storage
      localStorage.setItem('students', JSON.stringify(existingData));

      // Reset form after submission
      this.registrationForm.reset();
      this.router.navigate(['/stulogin']);
    } else {
      // Handle invalid form submission
    }
  }
}
