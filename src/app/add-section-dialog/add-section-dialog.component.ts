
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface SectionData {
  sno: number;
  class: string;
  section: string;
  status: 'Active' | 'Inactive'; // Add the status property
}

@Component({
  selector: 'app-add-section-dialog',
  templateUrl: './add-section-dialog.component.html',
  styleUrls: ['./add-section-dialog.component.css']
})
export class AddSectionDialogComponent {
  sectionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddSectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.sectionForm = this.fb.group({
      class: ['', [Validators.required, Validators.maxLength(50)]],
      section: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    if (this.sectionForm.valid) {
      this.dialogRef.close(this.sectionForm.value);
    }
  }
}
