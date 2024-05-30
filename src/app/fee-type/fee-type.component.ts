import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddFeeTypeDialogComponent } from '../add-fee-type-dialog/add-fee-type-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { StatusConfirmationDialogComponent } from '../status-confirmation-dialog/status-confirmation-dialog.component';
import { EditFeeTypeDialogComponent } from '../edit-fee-type-dialog/edit-fee-type-dialog.component';
import { ViewFeeTypeDialogComponent } from '../view-fee-type-dialog/view-fee-type-dialog.component';

interface FeeTypeRecord {
  id: string;
  sno: number;
  feeType: string;
  status: 'Active' | 'Inactive'; // Add the status property
}

@Component({
  selector: 'app-fee-type',
  templateUrl: './fee-type.component.html',
  styleUrls: ['./fee-type.component.css']
})
export class FeeTypeComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'feeType', 'status', 'actions'];
  dataSource: MatTableDataSource<FeeTypeRecord>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  feeTypes: FeeTypeRecord[] = [];

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.feeTypes);
  }

  ngOnInit(): void {
    this.loadFeeTypes();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

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

  openAddFeeTypeDialog(): void {
    const dialogRef = this.dialog.open(AddFeeTypeDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addFeeType(result);
      }
    });
  }

  addFeeType(feeType: string): void {
    const newId = this.generateUniqueId();
    const newFeeType: FeeTypeRecord = {
      id: newId,
      sno: this.feeTypes.length + 1,
      feeType: feeType,
      status: 'Active'
    };
    this.feeTypes.push(newFeeType);
    this.dataSource.data = this.feeTypes;
    this.saveFeeTypesToLocalStorage();
  }

  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  saveFeeTypesToLocalStorage(): void {
    localStorage.setItem('feeTypes', JSON.stringify(this.feeTypes));
  }

  loadFeeTypes(): void {
    const savedFeeTypes = localStorage.getItem('feeTypes');
    if (savedFeeTypes) {
      this.feeTypes = JSON.parse(savedFeeTypes);
      this.dataSource.data = this.feeTypes;
    }
  }

  
  editFeeType(record: FeeTypeRecord): void {
    const dialogRef = this.dialog.open(EditFeeTypeDialogComponent, {
      width: '300px',
      data: record
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.feeTypes.findIndex(fee => fee.id === result.id);
        if (index !== -1) {
          this.feeTypes[index] = result;
          this.dataSource.data = this.feeTypes;
          this.saveFeeTypesToLocalStorage();
        }
      }
    });
  }

  viewFeeType(record: FeeTypeRecord): void {
    this.dialog.open(ViewFeeTypeDialogComponent, {
      width: '300px',
      data: record
    });
  }

  confirmDelete(element: FeeTypeRecord): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: { feeType: element.feeType }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSection(element);
      }
    });
  }

  deleteSection(element: FeeTypeRecord): void {
    this.feeTypes = this.feeTypes.filter(section => section.sno !== element.sno);
    this.saveFeeTypesToLocalStorage();
    this.dataSource.data = [...this.feeTypes]; // Refresh the table data
  }
  

  confirmStatusChange(element: FeeTypeRecord): void {
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

  changeStatus(element: FeeTypeRecord): void {
    const index = this.feeTypes.findIndex(section => section.sno === element.sno);
    if (index !== -1) {
      this.feeTypes[index].status = this.feeTypes[index].status === 'Active' ? 'Inactive' : 'Active';
      this.saveFeeTypesToLocalStorage();
      this.dataSource.data = [...this.feeTypes]; // Refresh the table data
    }
  }
}
