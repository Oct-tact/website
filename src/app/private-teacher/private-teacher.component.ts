
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeViewDialogComponent } from '../employee-view-dialog/employee-view-dialog.component';

@Component({
  selector: 'app-private-teacher',
  templateUrl: './private-teacher.component.html',
  styleUrls: ['./private-teacher.component.css']
})
export class PrivateTeacherComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'rollNumber', 'email', 'role', 'mobileNumber', 'action'];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    const allEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const privateTeachers = allEmployees.filter((employee: any) => employee.role === 'teacher');

    this.dataSource = new MatTableDataSource(privateTeachers);

    // Save private teacher details in local storage under a new key
    localStorage.setItem('privateTeachers', JSON.stringify(privateTeachers));
  }
  openViewDialog(student: any): void {
    this.dialog.open(EmployeeViewDialogComponent, {
      width: '400px',
      data: { student }
    });
  }

}

