
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface FeesData {
  sno: number;
  class: string;
  feesAmount: number;
  quarterFees: { Q1: number; Q2: number; Q3: number; Q4: number };
}

@Component({
  selector: 'app-add-fees-dialog',
  templateUrl: './add-fees-dialog.component.html',
  styleUrls: ['./add-fees-dialog.component.css']
})
export class AddFeesDialogComponent {
  class: string = '';
  feesAmount: number = 0;
  quarterFees = { Q1: 0, Q2: 0, Q3: 0, Q4: 0 };

  constructor(
    public dialogRef: MatDialogRef<AddFeesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  calculateQuarterFees(): void {
    const perQuarter = this.feesAmount / 4;
    this.quarterFees.Q1 = perQuarter;
    this.quarterFees.Q2 = perQuarter;
    this.quarterFees.Q3 = perQuarter;
    this.quarterFees.Q4 = perQuarter;
  }

  onAddClick(): void {
    this.dialogRef.close({
      class: this.class,
      feesAmount: this.feesAmount,
      quarterFees: this.quarterFees
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
