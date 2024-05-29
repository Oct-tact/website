
// import { Component, OnInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { SelectionModel } from '@angular/cdk/collections';
// import { MatDialog } from '@angular/material/dialog';
// import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
// import { QuarterPayDialogComponent } from '../quarter-pay-dialog/quarter-pay-dialog.component';

// interface FeeRecord {
//   quarter: string;
//   totalAmount: number;
//   status: string;
//   paidDate?: string;
//   class: string;
// }

// @Component({
//   selector: 'app-student-fees-management',
//   templateUrl: './student-fees-management.component.html',
//   styleUrls: ['./student-fees-management.component.css']
// })
// export class StudentFeesManagementComponent implements OnInit {
//   studentName: string = '';
//   rollNumber: string = '';
//   studentClass: string = '';

//   displayedColumns: string[] = ['select', 'quarter', 'totalAmount', 'status', 'paidDate', 'action'];
//   dataSource: MatTableDataSource<FeeRecord>;
//   selection = new SelectionModel<FeeRecord>(true, []);

//   feeData: FeeRecord[] = [];

//   constructor(public dialog: MatDialog) {
//     this.dataSource = new MatTableDataSource(this.feeData);
//   }

//   ngOnInit(): void {
//     this.loadStudentDetails();
//     this.loadFeeManagementData();
//   }

//   loadStudentDetails(): void {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
//     if (currentUser) {
//       this.studentName = currentUser.name;
//       this.rollNumber = currentUser.rollNumber;
//       this.studentClass = this.getStudentClass(currentUser.rollNumber);
//       this.initializeFeesData();
//     }
//   }

//   getStudentClass(rollNumber: string): string {
//     const students = JSON.parse(localStorage.getItem('students') || '[]');
//     const student = students.find((s: any) => s.rollNumber === rollNumber);
//     return student ? student.class : '';
//   }

//   initializeFeesData(): void {
//     const existingFeeData = this.loadFeeManagementData();
//     if (!existingFeeData) {
//       this.loadFeesDataForNewStudent();
//     }
//   }

//   loadFeesDataForNewStudent(): void {
//     const feesData = JSON.parse(localStorage.getItem('feesData') || '[]');
//     const classFees = feesData.find((fee: any) => fee.class === this.studentClass);

//     if (classFees) {
//       this.feeData = [
//         { quarter: 'Q1', totalAmount: classFees.quarterFees.Q1, status: 'Due', class: this.studentClass },
//         { quarter: 'Q2', totalAmount: classFees.quarterFees.Q2, status: 'Due', class: this.studentClass },
//         { quarter: 'Q3', totalAmount: classFees.quarterFees.Q3, status: 'Due', class: this.studentClass },
//         { quarter: 'Q4', totalAmount: classFees.quarterFees.Q4, status: 'Due', class: this.studentClass }
//       ];
//       this.saveFeeManagementData();
//       this.dataSource.data = [...this.feeData];
//     }
//   }

//   loadFeeManagementData(): FeeRecord[] | null {
//     const feeManagementData = JSON.parse(localStorage.getItem('feeManagementData') || '[]');
//     const studentFeeData = feeManagementData.find((data: any) => data.rollNumber === this.rollNumber);

//     if (studentFeeData) {
//       this.feeData = studentFeeData.feeData;
//       this.dataSource.data = [...this.feeData];
//       return this.feeData;
//     }
//     return null;
//   }

//   saveFeeManagementData(): void {
//     const feeManagementData = JSON.parse(localStorage.getItem('feeManagementData') || '[]');
//     const studentIndex = feeManagementData.findIndex((data: any) => data.rollNumber === this.rollNumber);

//     if (studentIndex !== -1) {
//       feeManagementData[studentIndex].feeData = this.feeData;
//     } else {
//       feeManagementData.push({ rollNumber: this.rollNumber, feeData: this.feeData });
//     }

//     localStorage.setItem('feeManagementData', JSON.stringify(feeManagementData));
//     this.updateStudentFeesStatus();
//   }

//   updateStudentFeesStatus(): void {
//     const students = JSON.parse(localStorage.getItem('students') || '[]');
//     const studentIndex = students.findIndex((s: any) => s.rollNumber === this.rollNumber);

//     if (studentIndex !== -1) {
//       const dueQuarters = this.feeData.filter(fee => fee.status === 'Due').map(fee => fee.quarter);
//       if (dueQuarters.length === 0) {
//         students[studentIndex].statusFees = 'All Paid';
//       } else {
//         const nextDueQuarter = dueQuarters[0];
//         const installmentNames = ['First', 'Second', 'Third', 'Fourth'];
//         const installmentIndex = ['Q1', 'Q2', 'Q3', 'Q4'].indexOf(nextDueQuarter);
//         students[studentIndex].statusFees = `${installmentNames[installmentIndex]} Installment Due`;
//       }
//       localStorage.setItem('students', JSON.stringify(students));
//     }
//   }

//   isAllSelected() {
//     const numSelected = this.selection.selected.length;
//     const numRows = this.dataSource.data.length;
//     return numSelected === numRows;
//   }

//   masterToggle() {
//     this.isAllSelected() ?
//         this.selection.clear() :
//         this.dataSource.data.forEach(row => this.selection.select(row));
//   }

//   openSinglePayDialog(): void {
//     const selectedQuarters = this.selection.selected;
//     const dialogRef = this.dialog.open(PaymentDialogComponent, {
//       width: '300px',
//       data: { quarters: selectedQuarters }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.handlePayment(result);
//       }
//     });
//   }

//   openQuarterPayDialog(quarter: FeeRecord): void {
//     const dialogRef = this.dialog.open(QuarterPayDialogComponent, {
//       width: '300px',
//       data: { quarter }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.handleIndividualPayment(result);
//       }
//     });
//   }

//   handlePayment(selectedQuarters: FeeRecord[]): void {
//     const currentDate = new Date().toLocaleDateString();
//     selectedQuarters.forEach(quarter => {
//       quarter.status = 'Paid';
//       quarter.paidDate = currentDate;
//     });
//     this.dataSource.data = [...this.feeData];
//     this.saveFeeManagementData();
//     this.selection.clear();
//   }

//   handleIndividualPayment(quarter: FeeRecord): void {
//     const currentDate = new Date().toLocaleDateString();
//     if (quarter.status === 'Due') {
//       quarter.status = 'Paid';
//       quarter.paidDate = currentDate;
//     }
//     this.dataSource.data = [...this.feeData];
//     this.saveFeeManagementData();
//   }
// }



import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { QuarterPayDialogComponent } from '../quarter-pay-dialog/quarter-pay-dialog.component';

interface FeeRecord {
  quarter: string;
  totalAmount: number;
  status: string;
  paidDate?: string;
  class: string;
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

  displayedColumns: string[] = ['select', 'quarter', 'totalAmount', 'status', 'paidDate', 'action'];
  dataSource: MatTableDataSource<FeeRecord>;
  selection = new SelectionModel<FeeRecord>(true, []);

  feeData: FeeRecord[] = [];

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.feeData);
  }

  ngOnInit(): void {
    this.loadStudentDetails();
    this.loadFeeManagementData();
  }

  loadStudentDetails(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser) {
      this.studentName = currentUser.name;
      this.rollNumber = currentUser.rollNumber;
      this.studentClass = this.getStudentClass(currentUser.rollNumber);
      this.initializeFeesData();
    }
  }

  getStudentClass(rollNumber: string): string {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const student = students.find((s: any) => s.rollNumber === rollNumber);
    return student ? student.class : '';
  }

  initializeFeesData(): void {
    const existingFeeData = this.loadFeeManagementData();
    if (!existingFeeData) {
      this.loadFeesDataForNewStudent();
    }
  }

  loadFeesDataForNewStudent(): void {
    const feesData = JSON.parse(localStorage.getItem('feesData') || '[]');
    const classFees = feesData.find((fee: any) => fee.class === this.studentClass);

    if (classFees) {
      this.feeData = [
        { quarter: 'Q1', totalAmount: classFees.quarterFees.Q1, status: 'Due', class: this.studentClass },
        { quarter: 'Q2', totalAmount: classFees.quarterFees.Q2, status: 'Due', class: this.studentClass },
        { quarter: 'Q3', totalAmount: classFees.quarterFees.Q3, status: 'Due', class: this.studentClass },
        { quarter: 'Q4', totalAmount: classFees.quarterFees.Q4, status: 'Due', class: this.studentClass }
      ];
      this.saveFeeManagementData();
      this.dataSource.data = [...this.feeData];
    }
  }

  loadFeeManagementData(): FeeRecord[] | null {
    const feeManagementData = JSON.parse(localStorage.getItem('feeManagementData') || '[]');
    const studentFeeData = feeManagementData.find((data: any) => data.rollNumber === this.rollNumber);

    if (studentFeeData) {
      this.feeData = studentFeeData.feeData;
      this.dataSource.data = [...this.feeData];
      return this.feeData;
    }
    return null;
  }

  saveFeeManagementData(): void {
    const feeManagementData = JSON.parse(localStorage.getItem('feeManagementData') || '[]');
    const studentIndex = feeManagementData.findIndex((data: any) => data.rollNumber === this.rollNumber);

    if (studentIndex !== -1) {
      feeManagementData[studentIndex].feeData = this.feeData;
    } else {
      feeManagementData.push({ rollNumber: this.rollNumber, feeData: this.feeData });
    }

    localStorage.setItem('feeManagementData', JSON.stringify(feeManagementData));
    this.updateStudentFeesStatus();
  }

  updateStudentFeesStatus(): void {
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const studentIndex = students.findIndex((s: any) => s.rollNumber === this.rollNumber);

    if (studentIndex !== -1) {
      const dueQuarters = this.feeData.filter(fee => fee.status === 'Due').map(fee => fee.quarter);
      if (dueQuarters.length === 0) {
        students[studentIndex].statusFees = 'All Paid';
      } else {
        const nextDueQuarter = dueQuarters[0];
        const installmentNames = ['First', 'Second', 'Third', 'Fourth'];
        const installmentIndex = ['Q1', 'Q2', 'Q3', 'Q4'].indexOf(nextDueQuarter);
        students[studentIndex].statusFees = `${installmentNames[installmentIndex]} Installment Due`;
      }
      localStorage.setItem('students', JSON.stringify(students));
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  openSinglePayDialog(): void {
    const selectedQuarters = this.selection.selected;

    if (this.validateQuarterSelection(selectedQuarters)) {
      const dialogRef = this.dialog.open(PaymentDialogComponent, {
        width: '300px',
        data: { quarters: selectedQuarters }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.handlePayment(result);
        }
      });
    } else {
      alert('Please ensure you select and pay quarters in order without skipping.');
    }
  }

  validateQuarterSelection(selectedQuarters: FeeRecord[]): boolean {
    const quarterOrder = ['Q1', 'Q2', 'Q3', 'Q4'];
    let lastPaidQuarterIndex = -1;

    for (const quarter of this.feeData) {
      if (quarter.status === 'Paid') {
        lastPaidQuarterIndex = quarterOrder.indexOf(quarter.quarter);
      }
    }

    for (const selected of selectedQuarters) {
      const selectedQuarterIndex = quarterOrder.indexOf(selected.quarter);
      if (selectedQuarterIndex > lastPaidQuarterIndex + 1) {
        return false;
      }
      lastPaidQuarterIndex = selectedQuarterIndex;
    }

    return true;
  }

  openQuarterPayDialog(quarter: FeeRecord): void {
    if (this.canPayQuarter(quarter)) {
      const dialogRef = this.dialog.open(QuarterPayDialogComponent, {
        width: '300px',
        data: { quarter }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.handleIndividualPayment(result);
        }
      });
    } else {
      alert('Please pay previous quarters first.');
    }
  }

  canPayQuarter(quarter: FeeRecord): boolean {
    const quarterOrder = ['Q1', 'Q2', 'Q3', 'Q4'];
    const quarterIndex = quarterOrder.indexOf(quarter.quarter);

    if (quarterIndex === 0) return true;

    const previousQuarter = this.feeData.find(fee => fee.quarter === quarterOrder[quarterIndex - 1]);
    return !! previousQuarter && previousQuarter.status === 'Paid';
  }

  handlePayment(selectedQuarters: FeeRecord[]): void {
    const currentDate = new Date().toLocaleDateString();
    selectedQuarters.forEach(quarter => {
      quarter.status = 'Paid';
      quarter.paidDate = currentDate;
    });
    this.dataSource.data = [...this.feeData];
    this.saveFeeManagementData();
    this.selection.clear();
  }

  handleIndividualPayment(quarter: FeeRecord): void {
    const currentDate = new Date().toLocaleDateString();
    if (quarter.status === 'Due') {
      quarter.status = 'Paid';
      quarter.paidDate = currentDate;
    }
    this.dataSource.data = [...this.feeData];
    this.saveFeeManagementData();
  }
}
