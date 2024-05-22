
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-subject-dialog',
  templateUrl: './view-subject-dialog.component.html',
  styleUrls: ['./view-subject-dialog.component.css']
})
export class ViewSubjectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewSubjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}

