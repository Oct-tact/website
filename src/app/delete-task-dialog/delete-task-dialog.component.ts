import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.css']
})
export class DeleteTaskDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public rowData: any
  ) {}

  remove(): void {
    this.dialogRef.close(true); // Return true to indicate removal
  }

  cancel(): void {
    this.dialogRef.close(false); // Return false to indicate cancellation
  }
}

