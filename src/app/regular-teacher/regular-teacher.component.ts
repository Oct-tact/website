
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeViewDialogComponent } from '../employee-view-dialog/employee-view-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-regular-teacher',
  templateUrl: './regular-teacher.component.html',
  styleUrls: ['./regular-teacher.component.css']
})
export class RegularTeacherComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'rollNumber', 'email', 'role', 'mobileNumber', 'action'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    const allEmployees = JSON.parse(localStorage.getItem('employees') || '[]');
    const regularTeachers = allEmployees.filter((employee: any) => employee.role === 'teacher');

    this.dataSource = new MatTableDataSource(regularTeachers);
    localStorage.setItem('regularTeachers', JSON.stringify(regularTeachers));
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

  openViewDialog(student: any): void {
    this.dialog.open(EmployeeViewDialogComponent, {
      width: '400px',
      data: { student }
    });
  }

}
