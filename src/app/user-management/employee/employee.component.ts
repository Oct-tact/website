import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeDeleteDialogComponent } from 'src/app/employee-delete-dialog/employee-delete-dialog.component';
import { EmployeeEditDialogComponent } from 'src/app/employee-edit-dialog/employee-edit-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name','rollNumber','email', 'role', 'mobileNumber','action']; // Define columns for the table

  
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    // Fetch all registered students from local storage
    const existingData = JSON.parse(localStorage.getItem('employees') || '[]');
    this.dataSource = new MatTableDataSource(existingData);
  }
  openEditDialog(student: any): void {
    const dialogRef = this.dialog.open(EmployeeEditDialogComponent, {
      width: '400px',
      data: { student }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Refresh the table data after editing
      const existingData = JSON.parse(localStorage.getItem('employees') || '[]');
      this.dataSource.data = existingData;
    });
  }


  opendeleteDialog(student: any): void {
    const dialogRef = this.dialog.open(EmployeeDeleteDialogComponent, {
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
    localStorage.setItem('employees', JSON.stringify(this.dataSource.data));
  }

}