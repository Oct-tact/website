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
import { EmployeeUpdatePasswordDialogComponent } from 'src/app/employee-update-password-dialog/employee-update-password-dialog.component';
import { StudentViewDialogComponent } from 'src/app/student-view-dialog/student-view-dialog.component';
import { StatusConfirmationDialogComponent } from 'src/app/status-confirmation-dialog/status-confirmation-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit  {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name','rollNumber','email', 'class', 'parentContact','status','action']; // Define columns for the table

  
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
  openViewDialog(student: any): void {
    this.dialog.open(StudentViewDialogComponent, {
      width: '400px',
      data: { student }
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
    const dialogRef = this.dialog.open(EmployeeUpdatePasswordDialogComponent, {
      width: '400px',
      data: { student }
    });

    dialogRef.afterClosed().subscribe(newPassword => {
      if (newPassword) {
        const index = this.dataSource.data.findIndex((item: { id: any; }) => item.id === student.id);
        if (index !== -1) {
          this.dataSource.data[index].password = newPassword;
          this.dataSource._updateChangeSubscription();
          this.updateLocalStorage();
        }
      }
    });
  }

  // openStatusChangeDialog(student: any): void {
  //   const dialogRef = this.dialog.open(StatusConfirmationDialogComponent, {
  //     width: '400px',
  //     data: { status: student.status } // Pass current status to the dialog
  //   });

  //   dialogRef.afterClosed().subscribe(confirm => {
  //     if (confirm) {
  //       student.status = student.status === 'Active' ? 'Inactive' : 'Active'; // Toggle status
  //       this.updateLocalStorage();
  //     }
  //   });
  // }


  openStatusChangeDialog(student: any): void {
    if (!student.status) {
      student.status = 'Active'; // Set initial status to Active if undefined or null
    }
    
    const dialogRef = this.dialog.open(StatusConfirmationDialogComponent, {
      width: '400px',
      data: { status: student.status } // Pass current status to the dialog
    });
  
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        student.status = student.status === 'Active' ? 'Inactive' : 'Active'; // Toggle status
        this.updateLocalStorage();
      }
    });
  }
  

 
  
}






