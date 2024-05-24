
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeViewDialogComponent } from '../employee-view-dialog/employee-view-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-both-teacher',
  templateUrl: './both-teacher.component.html',
  styleUrls: ['./both-teacher.component.css']
})
export class BothTeacherComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'rollNumber', 'email', 'role', 'mobileNumber', 'action'];

  constructor(private dialog: MatDialog) { }
  ngOnInit(): void {
    const allEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const bothTeachers = allEmployees.filter((employee: any) => employee.role === 'teacher');

    this.dataSource = new MatTableDataSource(bothTeachers);

    // Save both teacher details in local storage under a new key
    localStorage.setItem('bothTeachers', JSON.stringify(bothTeachers));
  }
  openViewDialog(student: any): void {
    this.dialog.open(EmployeeViewDialogComponent, {
      width: '400px',
      data: { student }
    });
  }

}

