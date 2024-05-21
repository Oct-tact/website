import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface FeesData {
 
  class: string;
  feesAmount: number;
  quarterFees: { Q1: number; Q2: number; Q3: number; Q4: number };
}

@Component({
  selector: 'app-edit-fees-dialog',
  templateUrl: './edit-fees-dialog.component.html',
  styleUrls: ['./edit-fees-dialog.component.css']
})
export class EditFeesDialogComponent {
  updatedData: FeesData;

  constructor(
    public dialogRef: MatDialogRef<EditFeesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeesData
  ) {
    this.updatedData = { ...data };
    this.calculateQuarterFees();
  }

  onFeesAmountChange(): void {
    this.calculateQuarterFees();
  }

  calculateQuarterFees(): void {
    const quarterlyFee = this.updatedData.feesAmount / 4;
    this.updatedData.quarterFees = {
      Q1: quarterlyFee,
      Q2: quarterlyFee,
      Q3: quarterlyFee,
      Q4: quarterlyFee
    };
  }

  onUpdateClick(): void {
    this.dialogRef.close(this.updatedData);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
