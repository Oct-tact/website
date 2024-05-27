import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface StudentFeesData {
  sno: number;
  studentName: string;
  class: string;
  status: string;
}

@Component({
  selector: 'app-student-fees',
  templateUrl: './student-fees.component.html',
  styleUrls: ['./student-fees.component.css']
})
export class StudentFeesComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'studentName', 'class', 'status'];
  dataSource: MatTableDataSource<StudentFeesData>;

  constructor() {
    this.dataSource = new MatTableDataSource<StudentFeesData>([]);
  }

  ngOnInit(): void {
    this.loadStudentFeesData();
  }

  loadStudentFeesData(): void {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const feesData = students.map((student: any, index: number) => ({
      sno: index + 1,
      studentName: student.name,
      class: student.class,
      status: 'Pending'
    }));
    localStorage.setItem('studentFees', JSON.stringify(feesData)); // Save to local storage
    this.dataSource.data = feesData;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
