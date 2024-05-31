import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeetypeDialogComponent } from '../feetype-dialog/feetype-dialog.component';

export interface FeeAssignment {
  sno: number;
  class: string;
  totalAmount: number;
  fees: { feeType: string, amount: number }[];
  status: string;
}

@Component({
  selector: 'app-fees-assign',
  templateUrl: './fees-assign.component.html',
  styleUrls: ['./fees-assign.component.css']
})
export class FeesAssignComponent {
  displayedColumns: string[] = ['sno', 'class', 'totalAmount', 'status', 'action'];
  dataSource: FeeAssignment[] = this.loadFeesAssignments();

  constructor(public dialog: MatDialog) {}

  openAddFeeTypeDialog(): void {
    const dialogRef = this.dialog.open(FeetypeDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addFeeAssignment(result);
      }
    });
  }

  addFeeAssignment(data: FeeAssignment): void {
    const newSno = this.dataSource.length ? this.dataSource[this.dataSource.length - 1].sno + 1 : 1;
    const newFeeAssignment: FeeAssignment = {
      sno: newSno,
      class: data.class,
      totalAmount: data.totalAmount,
      fees: data.fees,
      status: 'Pending' // Set initial status as Pending
    };
    this.dataSource.push(newFeeAssignment);
    this.saveFeesAssignments();
    this.dataSource = [...this.dataSource]; // Refresh the table data
  }

  saveFeesAssignments(): void {
    localStorage.setItem('feesAssignments', JSON.stringify(this.dataSource));
  }

  loadFeesAssignments(): FeeAssignment[] {
    const fees = localStorage.getItem('feesAssignments');
    return fees ? JSON.parse(fees) : [];
  }

  // Define actions (view, edit, delete) methods here
  view(element: FeeAssignment) {
    // Handle view action
  }

  edit(element: FeeAssignment) {
    // Handle edit action
  }

  delete(element: FeeAssignment) {
    const index = this.dataSource.indexOf(element);
    if (index >= 0) {
      this.dataSource.splice(index, 1);
      this.saveFeesAssignments();
    }
  }
}
