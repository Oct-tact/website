import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeDeleteDialogComponent } from 'src/app/employee-delete-dialog/employee-delete-dialog.component';
import { EmployeeEditDialogComponent } from 'src/app/employee-edit-dialog/employee-edit-dialog.component';
import { EmployeeRegisterDialogComponent } from 'src/app/employee-register-dialog/employee-register-dialog.component';
import { EmployeeUpdatePasswordDialogComponent } from 'src/app/employee-update-password-dialog/employee-update-password-dialog.component';
import { EmployeeViewDialogComponent } from 'src/app/employee-view-dialog/employee-view-dialog.component';
import { StatusConfirmationDialogComponent } from 'src/app/status-confirmation-dialog/status-confirmation-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name','rollNumber','email', 'role', 'mobileNumber','status','action']; // Define columns for the table
  totalEmployees: number = 0;
  activeEmployees: number = 0;
  inactiveEmployees: number = 0;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  constructor(private dialog: MatDialog) { }

  // ngOnInit(): void {
  //   // Fetch all registered students from local storage
  //   const existingData = JSON.parse(localStorage.getItem('employees') || '[]');
  //   this.dataSource = new MatTableDataSource(existingData);
  // }

  ngOnInit(): void {
    this.refreshData();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refreshData(): void {
    const existingData = JSON.parse(localStorage.getItem('employees') || '[]');
    this.dataSource = new MatTableDataSource(existingData);
    this.totalEmployees = existingData.length;
    this.activeEmployees = existingData.filter((employee: any) => employee.status === 'Active').length;
    this.inactiveEmployees = this.totalEmployees - this.activeEmployees;
  }




  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(EmployeeRegisterDialogComponent, {
      width: '400px',
      data: { nextId: this.dataSource.data.length + 1 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const existingData = JSON.parse(localStorage.getItem('employees') || '[]');
        existingData.push(result);
        localStorage.setItem('employees', JSON.stringify(existingData));
        this.refreshData();
      }
    });
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
      this.refreshData();
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
        this.refreshData();
     
      }
    });
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

  openViewDialog(student: any): void {
    this.dialog.open(EmployeeViewDialogComponent, {
      width: '400px',
      data: { student }
    });
  }


  updateLocalStorage() {
    localStorage.setItem('employees', JSON.stringify(this.dataSource.data));
  }

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

      this.refreshData(); // Update counts
      }
    });
  }
}


