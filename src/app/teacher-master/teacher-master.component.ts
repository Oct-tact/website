
// import { Component, OnInit } from '@angular/core';

// interface TeacherData {
//   name: string;
//   class: string;
//   section: string;
//   status: string;
// }

// @Component({
//   selector: 'app-teacher-master',
//   templateUrl: './teacher-master.component.html',
//   styleUrls: ['./teacher-master.component.css']
// })
// export class TeacherMasterComponent implements OnInit {
//   displayedColumns: string[] = ['name', 'class', 'section', 'status'];
//   teacherData: TeacherData[] = [];

//   ngOnInit(): void {
//     this.loadTeacherData();
//   }

//   loadTeacherData(): void {
//     const employees = JSON.parse(localStorage.getItem('employees') || '[]');
//     this.teacherData = employees
//       .filter((emp: any) => emp.role === 'teacher')
//       .map((emp: any) => ({
//         name: emp.name,
//         class: emp.class || '',
//         section: emp.section || '',
//         status: 'Active'  // Default status
//       }));
//   }
// }


import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddTeacherDialogComponent } from '../add-teacher-dialog/add-teacher-dialog.component';

interface TeacherData {
  name: string;
  class: string;
  section: string;
  status: string;
}

@Component({
  selector: 'app-teacher-master',
  templateUrl: './teacher-master.component.html',
  styleUrls: ['./teacher-master.component.css']
})
export class TeacherMasterComponent implements OnInit {
  displayedColumns: string[] = ['name', 'class', 'section', 'status'];
  dataSource: MatTableDataSource<TeacherData>;
  teacherData: TeacherData[] = [];

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<TeacherData>(this.teacherData);
  }

  ngOnInit(): void {
    this.loadTeacherData();
  }

  loadTeacherData(): void {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    this.teacherData = employees
      .filter((emp: any) => emp.role === 'teacher')
      .map((emp: any) => ({
        name: emp.name,
        class: emp.class || '',
        section: emp.section || '',
        status: 'Active'  // Default status
      }));
    this.dataSource.data = this.teacherData;
    this.saveTeacherData();  // Save initial data
  }

  openAddTeacherDialog(): void {
    const dialogRef = this.dialog.open(AddTeacherDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTeacher(result);
      }
    });
  }

  addTeacher(data: TeacherData): void {
    this.teacherData.push(data);
    this.saveTeacherData();
    this.dataSource.data = [...this.teacherData]; // Refresh the table data
  }

  saveTeacherData(): void {
    localStorage.setItem('teacherData', JSON.stringify(this.teacherData));
  }
}
