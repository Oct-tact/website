import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeViewDialogComponent } from '../employee-view-dialog/employee-view-dialog.component';

@Component({
  selector: 'app-student-view-dialog',
  templateUrl: './student-view-dialog.component.html',
  styleUrls: ['./student-view-dialog.component.css']
})
export class StudentViewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StudentViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close(): void {
    this.dialogRef.close();
  }
}
