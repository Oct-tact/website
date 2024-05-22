
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-section-dialog',
  templateUrl: './edit-section-dialog.component.html',
  styleUrls: ['./edit-section-dialog.component.css']
})
export class EditSectionDialogComponent {
  sectionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditSectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.sectionForm = this.fb.group({
      class: [data.class, [Validators.required, Validators.maxLength(50)]],
      section: [data.section, [Validators.required, Validators.maxLength(50)]]
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onUpdateClick(): void {
    if (this.sectionForm.valid) {
      const updatedData = { ...this.data, ...this.sectionForm.value };
      this.dialogRef.close(updatedData);
      // this.dialogRef.close(this.sectionForm.value);
    }
  }
}
