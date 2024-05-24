
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeViewDialogComponent } from '../employee-view-dialog/employee-view-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-regular-teacher',
  templateUrl: './regular-teacher.component.html',
  styleUrls: ['./regular-teacher.component.css']
})
export class RegularTeacherComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'rollNumber', 'email', 'role', 'mobileNumber', 'action'];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    const allEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const regularTeachers = allEmployees.filter((employee: any) => employee.role === 'teacher');

    this.dataSource = new MatTableDataSource(regularTeachers);
    localStorage.setItem('regularTeachers', JSON.stringify(regularTeachers));
  }
  openViewDialog(student: any): void {
    this.dialog.open(EmployeeViewDialogComponent, {
      width: '400px',
      data: { student }
    });
  }

}
