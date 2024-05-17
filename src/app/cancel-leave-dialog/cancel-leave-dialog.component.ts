// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-cancel-leave-dialog',
//   templateUrl: './cancel-leave-dialog.component.html',
//   styleUrls: ['./cancel-leave-dialog.component.css']
// })
// export class CancelLeaveDialogComponent {

// }


import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-leave-dialog',
  templateUrl: './cancel-leave-dialog.component.html',
  styleUrls: ['./cancel-leave-dialog.component.css']
})
export class CancelLeaveDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CancelLeaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onDelete(): void {
    this.dialogRef.close(true);
  }
}
