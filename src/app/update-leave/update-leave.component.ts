// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


// export interface LeaveRequestData {
//   sno: number;
//   date: Date;
//   fromDate: Date;
//   toDate: Date;
//   noOfDays: number;
//   reason: string;
//   status: string;
// }


// @Component({
//   selector: 'app-update-leave',
//   templateUrl: './update-leave.component.html',
//   styleUrls: ['./update-leave.component.css']
// })
// export class UpdateLeaveComponent {
//   constructor(
//     public dialogRef: MatDialogRef&lt;UpdateLeaveDialogComponent&gt;,
//     @Inject(MAT_DIALOG_DATA) public data: LeaveRequestData
//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   calculateNoOfDays(): void {
//     if (this.data.fromDate &amp;&amp; this.data.toDate) {
//       const diff = Math.abs(this.data.toDate.getTime() - this.data.fromDate.getTime());
//       this.data.noOfDays = Math.ceil(diff / (1000 * 3600 * 24)) + 1; // Including both start and end date
//     } else {
//       this.data.noOfDays = 0;
//     }
//   }
// }


import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface LeaveRequestData {
  sno: number;
  date: Date;
  fromDate: Date;
  toDate: Date;
  noOfDays: number;
  reason: string;
  status: string;
}

@Component({
  selector: 'app-update-leave',
  templateUrl: './update-leave.component.html',
  styleUrls: ['./update-leave.component.css']
})
export class UpdateLeaveComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateLeaveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LeaveRequestData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  calculateNoOfDays(): void {
    if (this.data.fromDate && this.data.toDate) {
      const diff = Math.abs(this.data.toDate.getTime() - this.data.fromDate.getTime());
      this.data.noOfDays = Math.ceil(diff / (1000 * 3600 * 24)) + 1; // Including both start and end date
    } else {
      this.data.noOfDays = 0;
    }
  }
}

