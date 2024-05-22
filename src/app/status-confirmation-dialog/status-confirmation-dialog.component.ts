// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-status-confirmation-dialog',
//   templateUrl: './status-confirmation-dialog.component.html',
//   styleUrls: ['./status-confirmation-dialog.component.css']
// })
// export class StatusConfirmationDialogComponent {

// }


import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-status-confirmation-dialog',
    templateUrl: './status-confirmation-dialog.component.html',
  styleUrls: ['./status-confirmation-dialog.component.css']
 })
export class StatusConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StatusConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
