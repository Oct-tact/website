
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-leave-dialog',
  templateUrl: './view-leave-dialog.component.html',
  styleUrls: ['./view-leave-dialog.component.css']
})
export class ViewLeaveDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewLeaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
