import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-teacher-dialog',
  templateUrl: './add-teacher-dialog.component.html',
  styleUrls: ['./add-teacher-dialog.component.css']
})
export class AddTeacherDialogComponent implements OnInit {
  addTeacherForm: FormGroup;
  classOptions: any[] = [];
  sectionOptions: string[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddTeacherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.addTeacherForm = this.fb.group({
      name: ['', Validators.required],
      class: ['', Validators.required],
      section: ['', Validators.required],
      status: ['Active', Validators.required]
    });
  }

  ngOnInit(): void {
    const sectionData = JSON.parse(localStorage.getItem('sectionData') || '[]');
    this.classOptions = [...new Set(sectionData.map((item: any) => item.class))];
  }

  onClassChange(selectedClass: string): void {
    const sectionData = JSON.parse(localStorage.getItem('sectionData') || '[]');
    this.sectionOptions = sectionData
      .filter((item: any) => item.class === selectedClass)
      .map((item: any) => item.section);
  }

  onSubmit(): void {
    if (this.addTeacherForm.valid) {
      this.dialogRef.close(this.addTeacherForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
