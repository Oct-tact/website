
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-view-dialog',
  templateUrl: './employee-view-dialog.component.html',
  styleUrls: ['./employee-view-dialog.component.css']
})
export class EmployeeViewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EmployeeViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}

