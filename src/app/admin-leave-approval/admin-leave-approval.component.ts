

// import { Component, OnInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';

// interface LeaveRequest {
//   sno: number;
//   name: string;
//   role: string;
//   date: Date;
//   fromDate: Date;
//   toDate: Date;
//   noOfDays: number;
//   reason: string;
//   status: string;
// }

// @Component({
//   selector: 'app-admin-leave-approval',
//   templateUrl: './admin-leave-approval.component.html',
//   styleUrls: ['./admin-leave-approval.component.css']
// })
// export class AdminLeaveApprovalComponent implements OnInit {
//   displayedColumns: string[] = ['sno', 'name',  'fromDate', 'toDate',  'reason', 'status', 'action'];
//   studentDataSource: MatTableDataSource<LeaveRequest>;
//   employeeDataSource: MatTableDataSource<LeaveRequest>;

//   studentLeaveRequests: LeaveRequest[] = [];
//   employeeLeaveRequests: LeaveRequest[] = [];

//   constructor() {
//     this.studentDataSource = new MatTableDataSource<LeaveRequest>(this.studentLeaveRequests);
//     this.employeeDataSource = new MatTableDataSource<LeaveRequest>(this.employeeLeaveRequests);
//   }

//   ngOnInit(): void {
//     this.loadLeaveRequests();
//   }

//   // loadLeaveRequests(): void {
//   //   const studentRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
//   //   const employeeRequests = JSON.parse(localStorage.getItem('employeeLeaveRequests') || '[]');

//   //   this.studentLeaveRequests = studentRequests;
//   //   this.employeeLeaveRequests = employeeRequests;

//   //   this.studentDataSource.data = this.studentLeaveRequests;
//   //   this.employeeDataSource.data = this.employeeLeaveRequests;
//   // }


//   loadLeaveRequests(): void {
//     const studentRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
//     const employeeRequests = JSON.parse(localStorage.getItem('employeeLeaveRequests') || '[]');

//     // Assign employee name to the name property in employee leave requests
//     const employeeName = JSON.parse(localStorage.getItem('currentUser') || '{}').name;
//     this.employeeLeaveRequests = employeeRequests.map((request: LeaveRequest) => {
//       return { ...request, name: employeeName };
//     });

//     this.studentLeaveRequests = studentRequests;
//     this.studentDataSource.data = this.studentLeaveRequests;

//     this.employeeDataSource.data = this.employeeLeaveRequests;
//   }


//   approveLeave(request: LeaveRequest): void {
//     request.status = 'Approved';
//     this.saveLeaveRequests();
//   }

//   rejectLeave(request: LeaveRequest): void {
//     request.status = 'Rejected';
//     this.saveLeaveRequests();
//   }

//   saveLeaveRequests(): void {
//     localStorage.setItem('leaveRequests', JSON.stringify(this.studentLeaveRequests));
//     localStorage.setItem('employeeLeaveRequests', JSON.stringify(this.employeeLeaveRequests));
//   }
// }
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface LeaveRequest {
  sno: number;
  name: string; // This is the name of either student or employee
  role: string; // Assuming this indicates the role of the person (e.g., student or employee)
  date: Date;
  fromDate: Date;
  toDate: Date;
  noOfDays: number;
  reason: string;
  status: string;
  studentName?: string; // Include studentName here
  employeeName?: string; // Include employeeName here
}

@Component({
  selector: 'app-admin-leave-approval',
  templateUrl: './admin-leave-approval.component.html',
  styleUrls: ['./admin-leave-approval.component.css']
})
export class AdminLeaveApprovalComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'name', 'fromDate', 'toDate', 'reason', 'status', 'action'];
  studentDataSource: MatTableDataSource<LeaveRequest>;
  employeeDataSource: MatTableDataSource<LeaveRequest>;

  studentLeaveRequests: LeaveRequest[] = [];
  employeeLeaveRequests: LeaveRequest[] = [];

  constructor() {
    this.studentDataSource = new MatTableDataSource<LeaveRequest>(this.studentLeaveRequests);
    this.employeeDataSource = new MatTableDataSource<LeaveRequest>(this.employeeLeaveRequests);
  }

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  loadLeaveRequests(): void {
    const studentRequests = JSON.parse(localStorage.getItem('leaveRequests') || '[]');
    const employeeRequests = JSON.parse(localStorage.getItem('employeeLeaveRequests') || '[]');

    this.studentLeaveRequests = studentRequests.map((request: LeaveRequest) => {
      return { ...request, name: request.studentName ? request.studentName : request.name };
    });

    this.employeeLeaveRequests = employeeRequests.map((request: LeaveRequest) => {
      return { ...request, name: request.employeeName ? request.employeeName : request.name };
    });

    this.studentDataSource.data = this.studentLeaveRequests;
    this.employeeDataSource.data = this.employeeLeaveRequests;
  }

  approveLeave(request: LeaveRequest): void {
    request.status = 'Approved';
    this.saveLeaveRequests();
  }

  rejectLeave(request: LeaveRequest): void {
    request.status = 'Rejected';
    this.saveLeaveRequests();
  }

  saveLeaveRequests(): void {
    localStorage.setItem('leaveRequests', JSON.stringify(this.studentLeaveRequests));
    localStorage.setItem('employeeLeaveRequests', JSON.stringify(this.employeeLeaveRequests));
  }
}
