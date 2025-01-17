// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-payment-dialog',
//   templateUrl: './payment-dialog.component.html',
//   styleUrls: ['./payment-dialog.component.css']
// })
// export class PaymentDialogComponent {

// }
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

 @Component({
   selector: 'app-payment-dialog',
   templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export  class PaymentDialogComponent {
  totalAmount: number;

  constructor(
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.totalAmount = data.quarters.reduce((sum: number, quarter: any) => sum + quarter.totalAmount, 0);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onPay(): void {
    this.dialogRef.close(this.data.quarters);
  }
}
