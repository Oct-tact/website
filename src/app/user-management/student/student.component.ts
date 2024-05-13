import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteTaskDialogComponent } from 'src/app/delete-task-dialog/delete-task-dialog.component';
import { EditTaskDialogComponent } from 'src/app/edit-task-dialog/edit-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentEditDialogComponent } from 'src/app/student-edit-dialog/student-edit-dialog.component';
import { StudentDeleteDialogComponent } from 'src/app/student-delete-dialog/student-delete-dialog.component';
import { StudentUpdatePasswordDialogComponent } from 'src/app/student-update-password-dialog/student-update-password-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit  {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name','rollNumber','email', 'grade', 'parentContact','action']; // Define columns for the table

  
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    // Fetch all registered students from local storage
    const existingData = JSON.parse(localStorage.getItem('students') || '[]');
    this.dataSource = new MatTableDataSource(existingData);
  }
  openEditDialog(student: any): void {
    const dialogRef = this.dialog.open(StudentEditDialogComponent, {
      width: '400px',
      data: { student }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Refresh the table data after editing
      const existingData = JSON.parse(localStorage.getItem('students') || '[]');
      this.dataSource.data = existingData;
    });
  }


  opendeleteDialog(student: any): void {
    const dialogRef = this.dialog.open(StudentDeleteDialogComponent, {
      width: '60%',
      data: { student }
    });
   
    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        const index = this.dataSource.data.findIndex((item: { id: any; }) => item.id === student.id);

        this.dataSource.data.splice(index, 1);
     
        this.dataSource._updateChangeSubscription(); // Manually trigger change detection
  
        this.updateLocalStorage();
     
      }
    });
  }
  updateLocalStorage() {
    localStorage.setItem('students', JSON.stringify(this.dataSource.data));
  }

  openUpdatePasswordDialog(student: any): void {
    const dialogRef = this.dialog.open(StudentUpdatePasswordDialogComponent, {
      width: '400px',
      data: { oldPassword: student.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle update password result here if needed
    });
  }
}





