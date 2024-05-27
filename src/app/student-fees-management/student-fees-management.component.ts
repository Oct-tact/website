import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface FeeRecord {
  quarter: string;
  totalAmount: number;
  status: string;
  action: string;
  class: string; // Add class field
}

@Component({
  selector: 'app-student-fees-management',
  templateUrl: './student-fees-management.component.html',
  styleUrls: ['./student-fees-management.component.css']
})
export class StudentFeesManagementComponent implements OnInit {
  studentName: string = '';
  rollNumber: string = '';
  studentClass: string = '';

  displayedColumns: string[] = ['quarter', 'totalAmount', 'status', 'action'];
  dataSource: MatTableDataSource<FeeRecord>;

  feeData: FeeRecord[] = [];

  constructor() {
    this.dataSource = new MatTableDataSource(this.feeData);
  }

  ngOnInit(): void {
    this.loadStudentDetails();
    this.loadFeeManagementData(); // Load saved fee management data
  }

  loadStudentDetails(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser) {
      this.studentName = currentUser.name;
      this.rollNumber = currentUser.rollNumber;
      this.studentClass = this.getStudentClass(currentUser.rollNumber);
      this.loadFeesData();
    }
  }

  getStudentClass(rollNumber: string): string {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const student = students.find((s: any) => s.rollNumber === rollNumber);
    return student ? student.class : '';
  }

  loadFeesData(): void {
    const feesData = JSON.parse(localStorage.getItem('feesData') || '[]');
    const classFees = feesData.find((fee: any) => fee.class === this.studentClass);

    if (classFees) {
      this.feeData = [
        { quarter: 'Q1', totalAmount: classFees.quarterFees.Q1, status: 'Pending', action: 'Pay Now', class: this.studentClass },
        { quarter: 'Q2', totalAmount: classFees.quarterFees.Q2, status: 'Pending', action: 'Pay Now', class: this.studentClass },
        { quarter: 'Q3', totalAmount: classFees.quarterFees.Q3, status: 'Pending', action: 'Pay Now', class: this.studentClass },
        { quarter: 'Q4', totalAmount: classFees.quarterFees.Q4, status: 'Pending', action: 'Pay Now', class: this.studentClass }
      ];
      this.saveFeeManagementData();
      this.dataSource.data = [...this.feeData];
    }
  }
  loadFeeManagementData(): void {
    const savedFeeData = JSON.parse(localStorage.getItem('feeManagementData') || '[]');
    if (savedFeeData.length > 0) {
      this.feeData = savedFeeData;
      this.dataSource.data = [...this.feeData];
    }
  }
  payNow(element: FeeRecord): void {
    // Implement payment logic here
    element.status = 'Paid';
    this.dataSource.data = [...this.feeData];
    this.saveFeeManagementData();
  }

  saveFeeManagementData(): void {
    localStorage.setItem('feeManagementData', JSON.stringify(this.feeData));
  }
}
