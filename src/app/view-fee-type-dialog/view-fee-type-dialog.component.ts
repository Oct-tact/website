
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface FeeTypeRecord {
  id: string;
  sno: number;
  feeType: string;
  status: string;
}

@Component({
  selector: 'app-view-fee-type-dialog',
  templateUrl: './view-fee-type-dialog.component.html',
  styleUrls: ['./view-fee-type-dialog.component.css']
})
export class ViewFeeTypeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewFeeTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeeTypeRecord
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
