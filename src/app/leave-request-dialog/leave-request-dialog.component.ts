// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-leave-request-dialog',
//   templateUrl: './leave-request-dialog.component.html',
//   styleUrls: ['./leave-request-dialog.component.css']
// })
// export class LeaveRequestDialogComponent {

// }
// leave-request-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface LeaveRequestData {
  fromDate: Date;
  toDate: Date;
  noOfDays: number;
  reason: string;
}

@Component({
  selector: 'app-leave-request-dialog',
  templateUrl: './leave-request-dialog.component.html',
  styleUrls: ['./leave-request-dialog.component.css']
})
export class LeaveRequestDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LeaveRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LeaveRequestData
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.data);
  }

  calculateDays(): void {
    if (this.data.fromDate && this.data.toDate) {
      const timeDiff = this.data.toDate.getTime() - this.data.fromDate.getTime();
      this.data.noOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
    } else {
      this.data.noOfDays = 0;
    }
  }
}
