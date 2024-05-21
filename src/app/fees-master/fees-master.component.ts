import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddFeesDialogComponent, FeesData } from '../add-fees-dialog/add-fees-dialog.component';
import { ViewFeesDialogComponent } from '../view-fees-dialog/view-fees-dialog.component';
import { EditFeesDialogComponent } from '../edit-fees-dialog/edit-fees-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-fees-master',
  templateUrl: './fees-master.component.html',
  styleUrls: ['./fees-master.component.css']
})
export class FeesMasterComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'class', 'feesAmount', 'action'];
  dataSource: MatTableDataSource<FeesData>;

  feesData: FeesData[] = JSON.parse(localStorage.getItem('feesData') || '[]');

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<FeesData>(this.feesData);
  }

  ngOnInit(): void {}

  openAddFeesDialog(): void {
    const dialogRef = this.dialog.open(AddFeesDialogComponent, {
      width: '400px',
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
      quarterFees: data.quarterFees
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
    }
  }

  viewFees(element: FeesData): void {
    this.dialog.open(ViewFeesDialogComponent, {
      width: '400px',
      data: { ...element }
    });
  }

  editFees(element: FeesData): void {
    const dialogRef = this.dialog.open(EditFeesDialogComponent, {
      width: '400px',
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
}
