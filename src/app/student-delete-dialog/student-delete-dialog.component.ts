import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-delete-dialog',
  templateUrl: './student-delete-dialog.component.html',
  styleUrls: ['./student-delete-dialog.component.css']
})
export class StudentDeleteDialogComponent implements OnInit{
  constructor(
    private dialogRef: MatDialogRef<StudentDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  // onRemove(): void {
  //   // Remove the selected student from the table and local storage
  //   const existingData = JSON.parse(localStorage.getItem('students') || '[]');
  //   const index = existingData.findIndex((student: any) => student.email === this.data.student.email);
  //   if (index !== -1) {
  //     existingData.splice(index, 1); // Remove the student from the array
  //     localStorage.setItem('students', JSON.stringify(existingData)); // Update local storage
  //   }
  //   // Close the dialog
  //   this.dialogRef.close(true); // Pass true to indicate deletion
  // }

 

  remove(): void {
    this.dialogRef.close(true); // Return true to indicate removal
  }

  cancel(): void {
    this.dialogRef.close(false); // Return false to indicate cancellation
  }
}

  // onCancel(): void {
  //   // Close the dialog without deleting
  //   this.dialogRef.close(false); // Pass false to indicate cancellation
  // }


