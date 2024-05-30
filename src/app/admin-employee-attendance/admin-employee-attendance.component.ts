import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-employee-attendance',
  templateUrl: './admin-employee-attendance.component.html',
  styleUrls: ['./admin-employee-attendance.component.css']
})
export class AdminEmployeeAttendanceComponent {
  students: { name: string, role: string, status: string }[] = [];
  displayedColumns: string[] = ['name', 'role', 'status', 'action'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<any>(this.students);
  }

  ngOnInit(): void {
    // Retrieve student names from local storage
    const studentData = JSON.parse(localStorage.getItem('employees') || '[]');

    // Initialize students array with all registered students
    this.students = studentData.map((student: any) => ({
      name: student.name,
      role: student.role,
      status: 'Not Marked'
    }));

    // Reset attendance status on the next day
    this.resetAttendanceOnNextDay();

    // Load attendance status from local storage
    this.loadAttendanceStatus();
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


  markAttendance(student: { name: string, role: string, status: string }, status: string): void {
    student.status = status;
    this.saveAttendance();
    this.updateStudentAttendance(student.name, status); // Update student attendance status
    this.showSuccessMessage(status);
  }

  resetAttendanceOnNextDay(): void {
    const currentDate = new Date().toDateString();
    const lastAttendanceDate = localStorage.getItem('attendanceDate');
    if (lastAttendanceDate !== currentDate) {
      this.students.forEach(student => {
        student.status = 'Not Marked';
      });
      localStorage.setItem('attendanceDate', currentDate);
      this.saveAttendance();
    }
  }

  loadAttendanceStatus(): void {
    const savedAttendance = JSON.parse(localStorage.getItem('studentAttendance') || '[]');
    if (savedAttendance && savedAttendance.length > 0) {
      this.students.forEach((student, index) => {
        const attendanceStatus = savedAttendance.find((attendee: any) => attendee.name === student.name);
        if (attendanceStatus) {
          this.students[index].status = attendanceStatus.status;
        }
      });
    }
    this.dataSource.data = this.students;
  }

  saveAttendance(): void {
    localStorage.setItem('studentAttendance', JSON.stringify(this.students));
  }

  updateStudentAttendance(studentName: string, status: string): void {
    const studentAttendance = JSON.parse(localStorage.getItem('studentAttendanceByAdmin') || '[]');
    const studentRecord = studentAttendance.find((record: any) => record.name === studentName);
    if (studentRecord) {
      studentRecord.status = status;
    } else {
      studentAttendance.push({ name: studentName, status: status });
    }
    localStorage.setItem('studentAttendanceByAdmin', JSON.stringify(studentAttendance));
  }
  showSuccessMessage(status: string): void {
    const message = `Marked ${status.toLowerCase()} successfully.`;
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      verticalPosition: 'top' // Position of the snackbar
    });
  }
}
