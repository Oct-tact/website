
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddSectionDialogComponent, SectionData } from '../add-section-dialog/add-section-dialog.component';
import { EditSectionDialogComponent } from '../edit-section-dialog/edit-section-dialog.component';
import { ViewSectionDialogComponent } from '../view-section-dialog/view-section-dialog.component';
import { StatusConfirmationDialogComponent } from '../status-confirmation-dialog/status-confirmation-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-section-master',
  templateUrl: './section-master.component.html',
  styleUrls: ['./section-master.component.css']
})
export class SectionMasterComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'class', 'section', 'status', 'action'];
  dataSource: MatTableDataSource<SectionData>;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  sectionData: SectionData[] = JSON.parse(localStorage.getItem('sectionData') || '[]');

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<SectionData>(this.sectionData);
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

  openAddSectionDialog(): void {
    const dialogRef = this.dialog.open(AddSectionDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addSection(result);
      }
    });
  }

  addSection(data: SectionData): void {
    const newSno = this.sectionData.length ? this.sectionData[this.sectionData.length - 1].sno + 1 : 1;
    const newSectionData: SectionData = {
      sno: newSno,
      class: data.class,
      section: data.section,
      status: 'Active' // Set initial status as Active
    };
    this.sectionData.push(newSectionData);
    this.saveSectionData();
    this.dataSource.data = [...this.sectionData]; // Refresh the table data
  }

  saveSectionData(): void {
    localStorage.setItem('sectionData', JSON.stringify(this.sectionData));
  }

  onAction(element: SectionData, action: string): void {
    if (action === 'edit') {
      this.editSection(element);
    } else if (action === 'view') {
      this.viewSection(element);
    } else if (action === 'delete') {
      this.confirmDelete(element);
    } else if (action === 'status') {
      this.confirmStatusChange(element);
    }
  }

  editSection(element: SectionData): void {
    const dialogRef = this.dialog.open(EditSectionDialogComponent, {
      width: '400px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateSection(result);
      }
    });
  }

  updateSection(updatedData: SectionData): void {
    const index = this.sectionData.findIndex(section => section.sno === updatedData.sno);
    if (index !== -1) {
      this.sectionData[index] = updatedData;
      this.saveSectionData();
      this.dataSource.data = [...this.sectionData]; // Refresh the table data
    }
  }

  viewSection(element: SectionData): void {
    this.dialog.open(ViewSectionDialogComponent, {
      width: '400px',
      data: { ...element }
    });
  }

  confirmDelete(element: SectionData): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: { class: element.class, section: element.section }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSection(element);
      }
    });
  }

  deleteSection(element: SectionData): void {
    this.sectionData = this.sectionData.filter(section => section.sno !== element.sno);
    this.saveSectionData();
    this.dataSource.data = [...this.sectionData]; // Refresh the table data
  }

  confirmStatusChange(element: SectionData): void {
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

  changeStatus(element: SectionData): void {
    const index = this.sectionData.findIndex(section => section.sno === element.sno);
    if (index !== -1) {
      this.sectionData[index].status = this.sectionData[index].status === 'Active' ? 'Inactive' : 'Active';
      this.saveSectionData();
      this.dataSource.data = [...this.sectionData]; // Refresh the table data
    }
  }
}
