import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface SubjectMarks {
  subject: string;
  firstTerm: {
    exam: number;
    assignment1: number;
    assignment2: number;
  };
  secondTerm: {
    exam: number;
    project: number;
  };
  halfYearlyTerm: {
    exam: number;
    assignment1: number;
    assignment2: number;
  };
  finalTerm: {
    exam: number;
    project: number;
  };
}

@Component({
  selector: 'app-admin-marks',
  templateUrl: './admin-marks.component.html',
  styleUrls: ['./admin-marks.component.css']
})
export class AdminMarksComponent implements OnInit {
  displayedColumns: string[] = ['subject', 'firstTerm', 'secondTerm', 'halfYearlyTerm', 'finalTerm', 'actions'];
  dataSource = new MatTableDataSource<SubjectMarks>([]);

  ngOnInit(): void {
    // Initially no data
    this.dataSource.data = [];
  }

  addSubject(data: SubjectMarks): void {
    this.dataSource.data = [...this.dataSource.data, data];
  }

  editSubject(subject: SubjectMarks): void {
    // Implement edit functionality here
  }

  viewSubject(subject: SubjectMarks): void {
    // Implement view functionality here
  }

  deleteSubject(subject: SubjectMarks): void {
    this.dataSource.data = this.dataSource.data.filter(s => s !== subject);
  }
}
