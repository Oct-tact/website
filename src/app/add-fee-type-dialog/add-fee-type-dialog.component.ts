
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-fee-type-dialog',
  templateUrl: './add-fee-type-dialog.component.html',
  styleUrls: ['./add-fee-type-dialog.component.css']
})
export class AddFeeTypeDialogComponent {
  feeTypeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddFeeTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.feeTypeForm = this.fb.group({
      feeType: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    if (this.feeTypeForm.valid) {
      this.dialogRef.close(this.feeTypeForm.value.feeType);
    }
  }
}
