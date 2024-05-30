
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface FeeTypeRecord {
  id: string;
  sno: number;
  feeType: string;
  status: string;
}

@Component({
  selector: 'app-edit-fee-type-dialog',
  templateUrl: './edit-fee-type-dialog.component.html',
  styleUrls: ['./edit-fee-type-dialog.component.css']
})
export class EditFeeTypeDialogComponent {
  feeTypeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditFeeTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeeTypeRecord,
    private fb: FormBuilder
  ) {
    this.feeTypeForm = this.fb.group({
      feeType: [data.feeType, [Validators.required, Validators.minLength(3)]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onUpdateClick(): void {
    if (this.feeTypeForm.valid) {
      const updatedData = {
        ...this.data,
        feeType: this.feeTypeForm.value.feeType
      };
      this.dialogRef.close(updatedData);
    }
  }
}
