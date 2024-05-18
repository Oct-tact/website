// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-employee-leave',
//   templateUrl: './employee-leave.component.html',
//   styleUrls: ['./employee-leave.component.css']
// })
// export class EmployeeLeaveComponent {

// }
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { LeaveRequestDialogComponent, LeaveRequestData } from '../leave-request-dialog/leave-request-dialog.component';
import { UpdateLeaveComponent } from '../update-leave/update-leave.component';
import { CancelLeaveDialogComponent } from '../cancel-leave-dialog/cancel-leave-dialog.component';
import { ViewLeaveDialogComponent } from '../view-leave-dialog/view-leave-dialog.component';

interface LeaveRequest {
  sno: number;
  date: Date;
  fromDate: Date;
  toDate: Date;
  noOfDays: number;
  reason: string;
  status: string;
}

@Component({
  selector: 'app-employee-leave',
  templateUrl: './employee-leave.component.html',
  styleUrls: ['./employee-leave.component.css']
})
export class EmployeeLeaveComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'date', 'fromDate', 'toDate', 'noOfDays', 'reason', 'status', 'action'];
  dataSource: MatTableDataSource<LeaveRequest>;

  leaveRequests: LeaveRequest[] = [];

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<LeaveRequest>(this.leaveRequests);
  }

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  openLeaveRequestDialog(): void {
    const dialogRef = this.dialog.open(LeaveRequestDialogComponent, {
      width: '400px',
      data: { fromDate: null, toDate: null, noOfDays: 0, reason: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addLeaveRequest(result);
      }
    });
  }

  addLeaveRequest(data: LeaveRequestData): void {
    const newRequest: LeaveRequest = {
      sno: this.leaveRequests.length + 1,
      date: new Date(),
      fromDate: data.fromDate,
      toDate: data.toDate,
      noOfDays: data.noOfDays,
      reason: data.reason,
      status: 'Pending'
    };
    this.leaveRequests.push(newRequest);
    this.saveLeaveRequests();
    this.dataSource.data = [...this.leaveRequests]; // Refresh the table data
  }

  loadLeaveRequests(): void {
    const savedRequests = JSON.parse(localStorage.getItem('employeeLeaveRequests') || '[]');
    this.leaveRequests = savedRequests;
    this.dataSource.data = this.leaveRequests;
  }

  saveLeaveRequests(): void {
    localStorage.setItem('employeeLeaveRequests', JSON.stringify(this.leaveRequests));
  }

  onAction(element: LeaveRequest, action: string): void {
    if (action === 'update') {
      this.openUpdateDialog(element);
    } else if (action === 'view') {
      this.openViewDialog(element);
    } else if (action === 'cancel') {
      this.openCancelDialog(element);
    }
  }

  openUpdateDialog(element: LeaveRequest): void {
    const dialogRef = this.dialog.open(UpdateLeaveComponent, {
      width: '400px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateLeaveRequest(element.sno, result);
      }
    });
  }

  updateLeaveRequest(sno: number, data: LeaveRequestData): void {
    const index = this.leaveRequests.findIndex(request => request.sno === sno);
    if (index !== -1) {
      this.leaveRequests[index] = {
        ...this.leaveRequests[index],
        fromDate: data.fromDate,
        toDate: data.toDate,
        noOfDays: data.noOfDays,
        reason: data.reason,
        status: this.leaveRequests[index].status
      };
      this.saveLeaveRequests();
      this.dataSource.data = [...this.leaveRequests]; // Refresh the table data
    }
  }

  openCancelDialog(element: LeaveRequest): void {
    const dialogRef = this.dialog.open(CancelLeaveDialogComponent, {
      width: '400px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cancelLeaveRequest(element.sno);
      }
    });
  }

  cancelLeaveRequest(sno: number): void {
    this.leaveRequests = this.leaveRequests.filter(request => request.sno !== sno);
    this.saveLeaveRequests();
    this.dataSource.data = [...this.leaveRequests]; // Refresh the table data
  }

  openViewDialog(element: LeaveRequest): void {
    this.dialog.open(ViewLeaveDialogComponent, {
      width: '400px',
      data: { ...element }
    });
  }
}
