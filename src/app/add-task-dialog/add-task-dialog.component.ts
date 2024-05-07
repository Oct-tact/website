import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css']
})
export class AddTaskDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddTaskDialogComponent>) { }

  ngOnInit(): void {}

  addUser(title: any, description:any,startdate: any, enddate: any): void {
    // const parsedId = parseInt(title, 10); // Parse string to number
    const newUser = { title, description,startdate, enddate };
    this.dialogRef.close(newUser);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}