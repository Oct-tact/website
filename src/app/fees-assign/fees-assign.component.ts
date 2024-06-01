// import { Component, ViewChild } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { FeetypeDialogComponent } from '../feetype-dialog/feetype-dialog.component';
// import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
// import { StatusConfirmationDialogComponent } from '../status-confirmation-dialog/status-confirmation-dialog.component';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';

// export interface FeeAssignment {
//   sno: number;
//   class: string;
//   totalAmount: number;
//   fees: { feeType: string, amount: number }[];
//   status: 'Active' | 'Inactive'; // Add the status property
// }

// @Component({
//   selector: 'app-fees-assign',
//   templateUrl: './fees-assign.component.html',
//   styleUrls: ['./fees-assign.component.css']
// })
// export class FeesAssignComponent {
//   displayedColumns: string[] = ['sno', 'class', 'totalAmount', 'status', 'action'];
//   dataSource: FeeAssignment[] = this.loadFeesAssignments();
//   // dataSource!: MatTableDataSource<FeeAssignment>;

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

  
//   FeeAssignment: FeeAssignment[] = JSON.parse(localStorage.getItem('feesAssignments') || '[]');
//   constructor(public dialog: MatDialog) {
   
//   }




//   openAddFeeTypeDialog(): void {
//     const dialogRef = this.dialog.open(FeetypeDialogComponent, {
//       width: '400px'
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.addFeeAssignment(result);
//       }
//     });
//   }

//   addFeeAssignment(data: FeeAssignment): void {
//     const newSno = this.dataSource.length ? this.dataSource[this.dataSource.length - 1].sno + 1 : 1;
//     const newFeeAssignment: FeeAssignment = {
//       sno: newSno,
//       class: data.class,
//       totalAmount: data.totalAmount,
//       fees: data.fees,
//       status: 'Active' // Set initial status as Pending
//     };
//     this.dataSource.push(newFeeAssignment);
//     this.saveFeesAssignments();
//     this.dataSource = [...this.dataSource]; // Refresh the table data
//   }

//   saveFeesAssignments(): void {
//     localStorage.setItem('feesAssignments', JSON.stringify(this.dataSource));
//   }

//   loadFeesAssignments(): FeeAssignment[] {
//     const fees = localStorage.getItem('feesAssignments');
//     return fees ? JSON.parse(fees) : [];
//   }

//   // Define actions (view, edit, delete) methods here
//   view(element: FeeAssignment) {
//     // Handle view action
//   }

//   edit(element: FeeAssignment) {
//     // Handle edit action
//   }

//   confirmDelete(element: FeeAssignment): void {
//     const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
//       width: '400px',
//       data: { class: element.class, totalAmount: element.totalAmount,fees: element.fees}
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.deleteSection(element);
//       }
//     });
//   }

//   deleteSection(element: FeeAssignment): void {
//     this.FeeAssignment = this.FeeAssignment.filter(section => section.sno !== element.sno);
//     this.saveFeesAssignments();
//     this.dataSource = [...this.FeeAssignment]; // Refresh the table data
//   }

//   confirmStatusChange(element: FeeAssignment): void {
//     const dialogRef = this.dialog.open(StatusConfirmationDialogComponent, {
//       width: '400px',
//       data: { status: element.status }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.changeStatus(element);
//       }
//     });
//   }

//   changeStatus(element: FeeAssignment): void {
//     const index = this.FeeAssignment.findIndex(section => section.sno === element.sno);
//     if (index !== -1) {
//       this.FeeAssignment[index].status = this.FeeAssignment[index].status === 'Active' ? 'Inactive' : 'Active';
//       this.saveFeesAssignments();
//       this.dataSource = [...this.FeeAssignment]; // Refresh the table data
//     }
//   }

// }


import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeetypeDialogComponent } from '../feetype-dialog/feetype-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { StatusConfirmationDialogComponent } from '../status-confirmation-dialog/status-confirmation-dialog.component';
import { EditFeetypeDialogComponent } from '../edit-feetype-dialog/edit-feetype-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewFeetypeDialogComponent } from '../view-feetype-dialog/view-feetype-dialog.component';

export interface FeeAssignment {
  sno: number;
  class: string;
  totalAmount: number;
  fees: { feeType: string, amount: number }[];
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-fees-assign',
  templateUrl: './fees-assign.component.html',
  styleUrls: ['./fees-assign.component.css']
})
export class FeesAssignComponent {
  displayedColumns: string[] = ['sno', 'class', 'totalAmount', 'status', 'action'];
  dataSource: FeeAssignment[] = this.loadFeesAssignments();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  FeeAssignment: FeeAssignment[] = JSON.parse(localStorage.getItem('feesAssignments') || '[]');
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

  openEditFeeTypeDialog(element: FeeAssignment): void {
    const dialogRef = this.dialog.open(EditFeetypeDialogComponent, {
      width: '400px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateFeeAssignment(element.sno, result);
      }
    });
  }


  openViewFeeTypeDialog(element: FeeAssignment): void {
    this.dialog.open(ViewFeetypeDialogComponent, {
      width: '400px',
      data: element
    });
  }





  addFeeAssignment(data: FeeAssignment): void {
    const newSno = this.dataSource.length ? this.dataSource[this.dataSource.length - 1].sno + 1 : 1;
    const newFeeAssignment: FeeAssignment = {
      sno: newSno,
      class: data.class,
      totalAmount: data.totalAmount,
      fees: data.fees,
      status: 'Active'
    };
    this.dataSource.push(newFeeAssignment);
    this.saveFeesAssignments();
    this.dataSource = [...this.dataSource]; // Refresh the table data
  }

  updateFeeAssignment(sno: number, data: FeeAssignment): void {
    const index = this.dataSource.findIndex(item => item.sno === sno);
    if (index !== -1) {
      this.dataSource[index] = { ...data, sno: sno };
      this.saveFeesAssignments();
      this.dataSource = [...this.dataSource]; // Refresh the table data
    }
  }

  saveFeesAssignments(): void {
    localStorage.setItem('feesAssignments', JSON.stringify(this.dataSource));
  }

  loadFeesAssignments(): FeeAssignment[] {
    const fees = localStorage.getItem('feesAssignments');
    return fees ? JSON.parse(fees) : [];
  }

  confirmDelete(element: FeeAssignment): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: { class: element.class, totalAmount: element.totalAmount, fees: element.fees }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSection(element);
      }
    });
  }

  deleteSection(element: FeeAssignment): void {
    this.dataSource = this.dataSource.filter(section => section.sno !== element.sno);
    this.saveFeesAssignments();
    this.dataSource = [...this.dataSource]; // Refresh the table data
  }

  confirmStatusChange(element: FeeAssignment): void {
    const dialogRef = this.dialog.open(StatusConfirmationDialogComponent, {
      width: '400px',
      data: { status: element.status }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.changeStatus(element);
      }
    });
  }

  changeStatus(element: FeeAssignment): void {
    const index = this.dataSource.findIndex(section => section.sno === element.sno);
    if (index !== -1) {
      this.dataSource[index].status = this.dataSource[index].status === 'Active' ? 'Inactive' : 'Active';
      this.saveFeesAssignments();
      this.dataSource = [...this.dataSource]; // Refresh the table data
    }
  }
}
