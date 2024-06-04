import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-timetable-dialog',
  templateUrl: './delete-timetable-dialog.component.html',
  styleUrls: ['./delete-timetable-dialog.component.css']
})
export class DeleteTimetableDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteTimetableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}