// import { Component, OnInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatDialog } from '@angular/material/dialog';
// import { AddFeesDialogComponent, FeesData } from '../add-fees-dialog/add-fees-dialog.component';
// import { ViewFeesDialogComponent } from '../view-fees-dialog/view-fees-dialog.component';
// import { EditFeesDialogComponent } from '../edit-fees-dialog/edit-fees-dialog.component';
// import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

// @Component({
//   selector: 'app-fees-master',
//   templateUrl: './fees-master.component.html',
//   styleUrls: ['./fees-master.component.css']
// })
// export class FeesMasterComponent implements OnInit {
//   displayedColumns: string[] = ['sno', 'class', 'feesAmount', 'action'];
//   dataSource: MatTableDataSource<FeesData>;

//   feesData: FeesData[] = JSON.parse(localStorage.getItem('feesData') || '[]');

//   constructor(public dialog: MatDialog) {
//     this.dataSource = new MatTableDataSource<FeesData>(this.feesData);
//   }

//   ngOnInit(): void {}

//   openAddFeesDialog(): void {
//     const dialogRef = this.dialog.open(AddFeesDialogComponent, {
//       width: '400px',
//       data: {}
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.addFees(result);
//       }
//     });
//   }

//   addFees(data: FeesData): void {
//     const newSno = this.feesData.length ? this.feesData[this.feesData.length - 1].sno + 1 : 1;
//     const newFeesData: FeesData = {
//       sno: newSno,
//       class: data.class,
//       feesAmount: data.feesAmount,
//       quarterFees: data.quarterFees
//     };
//     this.feesData.push(newFeesData);
//     this.saveFeesData();
//     this.dataSource.data = [...this.feesData]; // Refresh the table data
//   }

//   saveFeesData(): void {
//     localStorage.setItem('feesData', JSON.stringify(this.feesData));
//   }

//   onAction(element: FeesData, action: string): void {
//     if (action === 'view') {
//       this.viewFees(element);
//     } else if (action === 'edit') {
//       this.editFees(element);
//     } else if (action === 'delete') {
//       this.confirmDelete(element);
//     }
//   }

//   viewFees(element: FeesData): void {
//     this.dialog.open(ViewFeesDialogComponent, {
//       width: '400px',
//       data: { ...element }
//     });
//   }

//   editFees(element: FeesData): void {
//     const dialogRef = this.dialog.open(EditFeesDialogComponent, {
//       width: '400px',
//       data: { ...element }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.updateFees(result);
//       }
//     });
//   }

//   updateFees(updatedData: FeesData): void {
//     const index = this.feesData.findIndex(fees => fees.sno === updatedData.sno);
//     if (index !== -1) {
//       this.feesData[index] = updatedData;
//       this.saveFeesData();
//       this.dataSource.data = [...this.feesData]; // Refresh the table data
//     }
//   }

//   confirmDelete(element: FeesData): void {
//     const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
//       width: '400px',
//       data: { class: element.class, feesAmount: element.feesAmount }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.deleteFees(element);
//       }
//     });
//   }

//   deleteFees(element: FeesData): void {
//     this.feesData = this.feesData.filter(fees => fees.sno !== element.sno);
//     this.saveFeesData();
//     this.dataSource.data = [...this.feesData]; // Refresh the table data
//   }
// }



import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddFeesDialogComponent, FeesData } from '../add-fees-dialog/add-fees-dialog.component';
import { ViewFeesDialogComponent } from '../view-fees-dialog/view-fees-dialog.component';
import { EditFeesDialogComponent } from '../edit-fees-dialog/edit-fees-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { StatusConfirmationDialogComponent } from '../status-confirmation-dialog/status-confirmation-dialog.component'; // Import the new dialog component
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-fees-master',
  templateUrl: './fees-master.component.html',
  styleUrls: ['./fees-master.component.css']
})
export class FeesMasterComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'class', 'feesAmount', 'status', 'action'];
  dataSource: MatTableDataSource<FeesData>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  feesData: FeesData[] = JSON.parse(localStorage.getItem('feesData') || '[]');

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<FeesData>(this.feesData);
  }

  ngOnInit(): void {}

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




  openAddFeesDialog(): void {
    const dialogRef = this.dialog.open(AddFeesDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addFees(result);
      }
    });
  }

  addFees(data: FeesData): void {
    const newSno = this.feesData.length ? this.feesData[this.feesData.length - 1].sno + 1 : 1;
    const newFeesData: FeesData = {
      sno: newSno,
      class: data.class,
      feesAmount: data.feesAmount,
      quarterFees: data.quarterFees,
      quarterDates: data.quarterDates, // Add quarter dates here
      status: 'Active' // Set initial status as Active
    };
    this.feesData.push(newFeesData);
    this.saveFeesData();
    this.dataSource.data = [...this.feesData]; // Refresh the table data
  }

  saveFeesData(): void {
    localStorage.setItem('feesData', JSON.stringify(this.feesData));
  }

  onAction(element: FeesData, action: string): void {
    if (action === 'view') {
      this.viewFees(element);
    } else if (action === 'edit') {
      this.editFees(element);
    } else if (action === 'delete') {
      this.confirmDelete(element);
    } else if (action === 'status') {
      this.confirmStatusChange(element);
    }
  }

  viewFees(element: FeesData): void {
    this.dialog.open(ViewFeesDialogComponent, {
      width: '500px',
      data: { ...element }
    });
  }

  editFees(element: FeesData): void {
    const dialogRef = this.dialog.open(EditFeesDialogComponent, {
      width: '500px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateFees(result);
      }
    });
  }

  updateFees(updatedData: FeesData): void {
    const index = this.feesData.findIndex(fees => fees.sno === updatedData.sno);
    if (index !== -1) {
      this.feesData[index] = updatedData;
      this.saveFeesData();
      this.dataSource.data = [...this.feesData]; // Refresh the table data
    }
  }

  confirmDelete(element: FeesData): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: { class: element.class, feesAmount: element.feesAmount }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteFees(element);
      }
    });
  }

  deleteFees(element: FeesData): void {
    this.feesData = this.feesData.filter(fees => fees.sno !== element.sno);
    this.saveFeesData();
    this.dataSource.data = [...this.feesData]; // Refresh the table data
  }

  confirmStatusChange(element: FeesData): void {
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

  changeStatus(element: FeesData): void {
    const index = this.feesData.findIndex(fees => fees.sno === element.sno);
    if (index !== -1) {
      this.feesData[index].status = this.feesData[index].status === 'Active' ? 'Inactive' : 'Active';
      this.saveFeesData();
      this.dataSource.data = [...this.feesData]; // Refresh the table data
    }
  }
}


