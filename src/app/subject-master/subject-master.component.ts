import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SubjectDialogComponent, SubjectData } from '../subject-dialog/subject-dialog.component';
import { EditSubjectDialogComponent } from '../edit-subject-dialog/edit-subject-dialog.component';
import { ViewSubjectDialogComponent } from '../view-subject-dialog/view-subject-dialog.component';
import { StatusConfirmationDialogComponent } from '../status-confirmation-dialog/status-confirmation-dialog.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-subject-master',
  templateUrl: './subject-master.component.html',
  styleUrls: ['./subject-master.component.css']
})
export class SubjectMasterComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'subject', 'class', 'status', 'action'];
  dataSource: MatTableDataSource<SubjectData>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  subjectData: SubjectData[] = JSON.parse(localStorage.getItem('subjectData') || '[]');

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<SubjectData>(this.subjectData);
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

  openAddSubjectDialog(): void {
    const dialogRef = this.dialog.open(SubjectDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addSubject(result);
      }
    });
  }

  addSubject(data: SubjectData): void {
    const newSno = this.subjectData.length ? this.subjectData[this.subjectData.length - 1].sno + 1 : 1;
    const newSubjectData: SubjectData = {
      sno: newSno,
      subject: data.subject,
      class: data.class,
      status: 'Active' // Set initial status as Active
    };
    this.subjectData.push(newSubjectData);
    this.saveSubjectData();
    this.dataSource.data = [...this.subjectData]; // Refresh the table data
  }

  saveSubjectData(): void {
    localStorage.setItem('subjectData', JSON.stringify(this.subjectData));
  }

  onAction(element: SubjectData, action: string): void {
    if (action === 'edit') {
      this.editSubject(element);
    } else if (action === 'view') {
      this.viewSubject(element);
    } else if (action === 'delete') {
      this.confirmDelete(element);
    } else if (action === 'status') {
      this.confirmStatusChange(element);
    }
  }

  editSubject(element: SubjectData): void {
    const dialogRef = this.dialog.open(EditSubjectDialogComponent, {
      width: '400px',
      data: { ...element }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateSubject(result);
      }
    });
  }

  updateSubject(updatedData: SubjectData): void {
    const index = this.subjectData.findIndex(subject => subject.sno === updatedData.sno);
    if (index !== -1) {
      this.subjectData[index] = updatedData;
      this.saveSubjectData();
      this.dataSource.data = [...this.subjectData]; // Refresh the table data
    }
  }

  viewSubject(element: SubjectData): void {
    this.dialog.open(ViewSubjectDialogComponent, {
      width: '400px',
      data: { ...element }
    });
  }

  confirmDelete(element: SubjectData): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: { subject: element.subject, class: element.class }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSubject(element);
      }
    });
  }

  deleteSubject(element: SubjectData): void {
    this.subjectData = this.subjectData.filter(subject => subject.sno !== element.sno);
    this.saveSubjectData();
    this.dataSource.data = [...this.subjectData]; // Refresh the table data
  }

  confirmStatusChange(element: SubjectData): void {
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

  changeStatus(element: SubjectData): void {
    const index = this.subjectData.findIndex(subject => subject.sno === element.sno);
    if (index !== -1) {
      this.subjectData[index].status = this.subjectData[index].status === 'Active' ? 'Inactive' : 'Active';
      this.saveSubjectData();
      this.dataSource.data = [...this.subjectData]; // Refresh the table data
    }
  }
}
