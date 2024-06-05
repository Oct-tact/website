// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-delete-timetableee-dialog',
//   templateUrl: './delete-timetableee-dialog.component.html',
//   styleUrls: ['./delete-timetableee-dialog.component.css']
// })
// export class DeleteTimetableeeDialogComponent {

// }
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-timetableee-dialog',
  templateUrl: './delete-timetableee-dialog.component.html',
  styleUrls: ['./delete-timetableee-dialog.component.css']
})
export class DeleteTimetableeeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteTimetableeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.dialogRef.close(true); // Pass true to indicate deletion
  }

}
