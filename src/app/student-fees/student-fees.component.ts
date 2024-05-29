// import { Component, OnInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';

// export interface StudentFeesData {
//   sno: number;
//   studentName: string;
//   class: string;
//   status: string;
// }

// @Component({
//   selector: 'app-student-fees',
//   templateUrl: './student-fees.component.html',
//   styleUrls: ['./student-fees.component.css']
// })
// export class StudentFeesComponent implements OnInit {
//   displayedColumns: string[] = ['sno', 'studentName', 'class', 'status'];
//   dataSource: MatTableDataSource<StudentFeesData>;

//   constructor() {
//     this.dataSource = new MatTableDataSource<StudentFeesData>([]);
//   }

//   ngOnInit(): void {
//     this.loadStudentFeesData();
//   }

//   loadStudentFeesData(): void {
//     const students = JSON.parse(localStorage.getItem('students') || '[]');
//     const feesData = students.map((student: any, index: number) => ({
//       sno: index + 1,
//       studentName: student.name,
//       class: student.class,
//       status: 'Pending'
//     }));
//     localStorage.setItem('studentFees', JSON.stringify(feesData)); // Save to local storage
//     this.dataSource.data = feesData;
//   }


//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';

// export interface StudentFeesData {
//   sno: number;
//   studentName: string;
//   class: string;
//   statusFees: string;
// }

// @Component({
//   selector: 'app-student-fees',
//   templateUrl: './student-fees.component.html',
//   styleUrls: ['./student-fees.component.css']
// })
// export class StudentFeesComponent implements OnInit {
//   displayedColumns: string[] = ['sno', 'studentName', 'class', 'statusFees'];
//   dataSource: MatTableDataSource<StudentFeesData>;

//   constructor() {
//     this.dataSource = new MatTableDataSource<StudentFeesData>([]);
//   }

//   ngOnInit(): void {
//     this.loadStudentFeesData();
//   }

//   loadStudentFeesData(): void {
//     const students = JSON.parse(localStorage.getItem('students') || '[]');
//     const feesData = students.map((student: any, index: number) => ({
//       sno: index + 1,
//       studentName: student.name,
//       class: student.class,
//       statusFees: student.statusFees || 'First Installment Due'
//     }));
//     this.dataSource.data = feesData;
//   }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//   }
// }



import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface StudentFeesData {
  sno: number;
  studentName: string;
  class: string;
  statusFees: string;
}

@Component({
  selector: 'app-student-fees',
  templateUrl: './student-fees.component.html',
  styleUrls: ['./student-fees.component.css']
})
export class StudentFeesComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'studentName', 'class', 'statusFees'];
  dataSource: MatTableDataSource<StudentFeesData>;

  constructor() {
    this.dataSource = new MatTableDataSource<StudentFeesData>([]);
  }

  ngOnInit(): void {
    this.loadStudentFeesData();
  }

  loadStudentFeesData(): void {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const feesData = students.map((student: any, index: number) => {
      const feeStatus = this.getFeeStatus(student.rollNumber);
      return {
        sno: index + 1,
        studentName: student.name,
        class: student.class,
        statusFees: feeStatus
      };
    });
    this.dataSource.data = feesData;
  }

  getFeeStatus(rollNumber: string): string {
    const feeManagementData = JSON.parse(localStorage.getItem('feeManagementData') || '[]');
    const studentFeeData = feeManagementData.find((data: any) => data.rollNumber === rollNumber);

    if (studentFeeData) {
      const dueInstallments = studentFeeData.feeData.filter((fee: any) => fee.status === 'Due');
      if (dueInstallments.length === 0) {
        return 'All Paid';
      } else {
        const nextDueInstallment = dueInstallments[0];
        const installmentNames = ['First', 'Second', 'Third', 'Fourth'];
        const installmentIndex = ['Q1', 'Q2', 'Q3', 'Q4'].indexOf(nextDueInstallment.quarter);
        return `${installmentNames[installmentIndex]} Installment Due`;
      }
    }

    return 'First Installment Due';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
