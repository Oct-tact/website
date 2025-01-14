
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddTeacherDialogComponent } from '../add-teacher-dialog/add-teacher-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

interface TeacherData {
  name: string;
  class: string;
  section: string;
  // subject?: string;  // Add subject field
  subjects: string[];  // Change subject to subjects array
  status: string;
  selected?: boolean;
}

@Component({
  selector: 'app-teacher-master',
  templateUrl: './teacher-master.component.html',
  styleUrls: ['./teacher-master.component.css']
})
export class TeacherMasterComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'class', 'section', 'subject', 'status', 'action'];
  dataSource: MatTableDataSource<TeacherData>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  teacherData: TeacherData[] = [];

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<TeacherData>(this.teacherData);
  }

  ngOnInit(): void {
    this.loadTeacherData();
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


  // loadTeacherData(): void {
  //   const savedTeacherData = JSON.parse(localStorage.getItem('teacherData') || '[]');
  //   const employees = JSON.parse(localStorage.getItem('employees') || '[]');
  //   this.teacherData = employees
  //     .filter((emp: any) => emp.role === 'teacher')
  //     .map((emp: any) => {
  //       const savedData = savedTeacherData.find((t: TeacherData) => t.name === emp.name) || {};
  //       return {
  //         name: emp.name,
  //         class: savedData.class || '',
  //         section: savedData.section || '',
  //         subject: savedData.subject || '',  // Initialize subject
  //         status: savedData.status || 'Pending',
  //         selected: false
  //       };
  //     });
  //   this.dataSource.data = this.teacherData;
  // }

  loadTeacherData(): void {
    const savedTeacherData = JSON.parse(localStorage.getItem('teacherData') || '[]');
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    this.teacherData = employees
      .filter((emp: any) => emp.role === 'teacher')
      .map((emp: any) => {
        const savedData = savedTeacherData.find((t: TeacherData) => t.name === emp.name) || {};
        return {
          name: emp.name,
          class: savedData.class || '',
          section: savedData.section || '',
          subjects: savedData.subjects || [],  // Initialize subjects as array
          status: savedData.status || 'Pending',
          selected: false
        };
      });
    this.dataSource.data = this.teacherData;
  }
  




  // openAddTeacherDialog(): void {
  //   const selectedTeachers = this.dataSource.data.filter(teacher => teacher.selected);
  //   if (selectedTeachers.length === 0) return;

  //   if (selectedTeachers.length > 8) {
  //     this.snackBar.open('You can only assign up to 8 teachers at a time.', 'Close', {
  //       duration: 3000,
  //     });
  //     return;
  //   }

  //   const dialogRef = this.dialog.open(AddTeacherDialogComponent, {
  //     width: '400px',
  //     data: { selectedTeachers }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.assignTeachers(result.class, result.section, result.subject);
  //     }
  //   });
  // }
  
  // openAssignDialog(teacher: TeacherData): void {
  //   const dialogRef = this.dialog.open(AddTeacherDialogComponent, {
  //     width: '400px',
  //     data: { selectedTeachers: [teacher] }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.assignTeacher(teacher, result.class, result.section,result.subject,);
  //     }
  //   });
  // }



  openAddTeacherDialog(): void {
    const selectedTeachers = this.dataSource.data.filter(teacher => teacher.selected);
    if (selectedTeachers.length === 0) return;
  
    if (selectedTeachers.length > 8) {
      this.snackBar.open('You can only assign up to 8 teachers at a time.', 'Close', {
        duration: 3000,
      });
      return;
    }
  
    const dialogRef = this.dialog.open(AddTeacherDialogComponent, {
      width: '400px',
      data: { selectedTeachers }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assignTeachers(result.class, result.section, result.subjects);
      }
    });
  }
  
  openAssignDialog(teacher: TeacherData): void {
    const dialogRef = this.dialog.open(AddTeacherDialogComponent, {
      width: '400px',
      data: { selectedTeachers: [teacher] }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assignTeacher(teacher, result.class, result.section, result.subjects);
      }
    });
  }
  

  // assignTeachers(selectedClass: string, selectedSection: string, selectedSubject: string): void {
  //   this.dataSource.data.forEach(teacher => {
  //     if (teacher.selected) {
  //       this.assignTeacher(teacher, selectedClass, selectedSection, selectedSubject);
  //       teacher.selected = false;
  //     }
  //   });
  //   this.saveTeacherData();
  //   this.dataSource.data = [...this.teacherData];
  // }

  // assignTeacher(teacher: TeacherData, selectedClass: string, selectedSection: string, selectedSubject: string): void {
  //   teacher.class = selectedClass;
  //   teacher.section = selectedSection;
  //   teacher.subject = selectedSubject;  // Assign subject
  //   teacher.status = 'Assigned';
  //   this.saveTeacherData();
  // }


  assignTeachers(selectedClass: string, selectedSection: string, selectedSubjects: string[]): void {
    this.dataSource.data.forEach(teacher => {
      if (teacher.selected) {
        this.assignTeacher(teacher, selectedClass, selectedSection, selectedSubjects);
        teacher.selected = false;
      }
    });
    this.saveTeacherData();
    this.dataSource.data = [...this.teacherData];
  }
  
  assignTeacher(teacher: TeacherData, selectedClass: string, selectedSection: string, selectedSubjects: string[]): void {
    teacher.class = selectedClass;
    teacher.section = selectedSection;
    teacher.subjects = selectedSubjects;  // Assign subjects array
    teacher.status = 'Assigned';
    this.saveTeacherData();
  }
  
  openUnassignDialog(teacher: TeacherData): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Do you want to unassign?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unassignTeacher(teacher);
      }
    });
  }

  // unassignTeacher(teacher: TeacherData): void {
  //   teacher.class = '';
  //   teacher.section = '';
  //   teacher.subject = '';  // Unassign subject
  //   teacher.status = 'Unassigned';
  //   this.saveTeacherData();
  //   this.dataSource.data = [...this.teacherData];
  // }

  unassignTeacher(teacher: TeacherData): void {
    teacher.class = '';
    teacher.section = '';
    teacher.subjects = [];  // Unassign subjects
    teacher.status = 'Unassigned';
    this.saveTeacherData();
    this.dataSource.data = [...this.teacherData];
  }
  

  saveTeacherData(): void {
    localStorage.setItem('teacherData', JSON.stringify(this.teacherData));
  }

  selectAll(event: any): void {
    const checked = event.checked;
    this.dataSource.data.forEach(teacher => {
      teacher.selected = checked;
    });
  }
}
