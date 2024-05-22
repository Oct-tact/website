
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-section-dialog',
  templateUrl: './view-section-dialog.component.html',
  styleUrls: ['./view-section-dialog.component.css']
})
export class ViewSectionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewSectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
