// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-quarter-pay-dialog',
//   templateUrl: './quarter-pay-dialog.component.html',
//   styleUrls: ['./quarter-pay-dialog.component.css']
// })
// export class QuarterPayDialogComponent {

// }
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-quarter-pay-dialog',
  templateUrl: './quarter-pay-dialog.component.html',
  styleUrls: ['./quarter-pay-dialog.component.css']
})
export class QuarterPayDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<QuarterPayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onPay(): void {
    this.dialogRef.close(this.data.quarter);
  }
}
