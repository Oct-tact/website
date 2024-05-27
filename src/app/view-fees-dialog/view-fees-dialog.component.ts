
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface FeesData {
 
  class: string;
  feesAmount: number;
  quarterFees: { Q1: number; Q2: number; Q3: number; Q4: number };
  quarterDates: { Q1: Date | null; Q2: Date | null; Q3: Date | null; Q4: Date | null };
}

@Component({
  selector: 'app-view-fees-dialog',
  templateUrl: './view-fees-dialog.component.html',
  styleUrls: ['./view-fees-dialog.component.css']
})
export class ViewFeesDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewFeesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeesData
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
