
// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { MatTableDataSource } from '@angular/material/table';
// import { AddTeacherDialogComponent } from '../add-teacher-dialog/add-teacher-dialog.component';

// interface TeacherData {
//   name: string;
//   class: string;
//   section: string;
//   status: string;
//   selected?: boolean; // Add selected property for checkbox functionality
// }

// @Component({
//   selector: 'app-teacher-master',
//   templateUrl: './teacher-master.component.html',
//   styleUrls: ['./teacher-master.component.css']
// })
// export class TeacherMasterComponent implements OnInit {
//   displayedColumns: string[] = ['select', 'name', 'class', 'section', 'status'];
//   dataSource: MatTableDataSource<TeacherData>;
//   teacherData: TeacherData[] = [];

//   constructor(public dialog: MatDialog) {
//     this.dataSource = new MatTableDataSource<TeacherData>(this.teacherData);
//   }

//   ngOnInit(): void {
//     this.loadTeacherData();
//   }

//   loadTeacherData(): void {
//     const savedTeacherData = JSON.parse(localStorage.getItem('teacherData') || '[]');
//     const employees = JSON.parse(localStorage.getItem('employees') || '[]');
//     this.teacherData = employees
//       .filter((emp: any) => emp.role === 'teacher')
//       .map((emp: any) => {
//         const savedData = savedTeacherData.find((t: TeacherData) => t.name === emp.name) || {};
//         return {
//           name: emp.name,
//           class: savedData.class || '',
//           section: savedData.section || '',
//           status: savedData.status || 'Pending', // Default status
//           selected: false // Initialize selected as false
//         };
//       });
//     this.dataSource.data = this.teacherData;
//   }

//   openAddTeacherDialog(): void {
//     const selectedTeachers = this.dataSource.data.filter(teacher => teacher.selected);
//     if (selectedTeachers.length === 0) return; // Exit if no teachers are selected

//     const dialogRef = this.dialog.open(AddTeacherDialogComponent, {
//       width: '400px',
//       data: { selectedTeachers }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.assignTeachers(result.class, result.section);
//       }
//     });
//   }

//   assignTeachers(selectedClass: string, selectedSection: string): void {
//     this.dataSource.data.forEach(teacher => {
//       if (teacher.selected) {
//         teacher.class = selectedClass;
//         teacher.section = selectedSection;
//         teacher.status = 'Assigned';
//         teacher.selected = false; // Unselect after assignment
//       }
//     });
//     this.saveTeacherData();
//     this.dataSource.data = [...this.teacherData]; // Refresh the table data
//   }

//   saveTeacherData(): void {
//     localStorage.setItem('teacherData', JSON.stringify(this.teacherData));
//   }

//   selectAll(event: any): void {
//     const checked = event.checked;
//     this.dataSource.data.forEach(teacher => {
//       teacher.selected = checked;
//     });
//   }
// }

// // crrect code
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddTeacherDialogComponent } from '../add-teacher-dialog/add-teacher-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar'; 

interface TeacherData {
  name: string;
  class: string;
  section: string;
  status: string;
  selected?: boolean;
}

@Component({
  selector: 'app-teacher-master',
  templateUrl: './teacher-master.component.html',
  styleUrls: ['./teacher-master.component.css']
})
export class TeacherMasterComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'class', 'section', 'status', 'action'];
  dataSource: MatTableDataSource<TeacherData>;
  teacherData: TeacherData[] = [];

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource<TeacherData>(this.teacherData);
  }

  ngOnInit(): void {
    this.loadTeacherData();
  }

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
          status: savedData.status || 'Pending', // Default status
          selected: false
        };
      });
    this.dataSource.data = this.teacherData;
  }

  // openAddTeacherDialog(): void {
  //   const selectedTeachers = this.dataSource.data.filter(teacher => teacher.selected);
  //   if (selectedTeachers.length === 0) return;

  //   const dialogRef = this.dialog.open(AddTeacherDialogComponent, {
  //     width: '400px',
  //     data: { selectedTeachers }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.assignTeachers(result.class, result.section);
  //     }
  //   });
  // }

  
  openAddTeacherDialog(): void {
    const selectedTeachers = this.dataSource.data.filter(teacher => teacher.selected);
    if (selectedTeachers.length === 0) return;

    if (selectedTeachers.length > 8) {
      this.snackBar.open('You can only assign up to 5 teachers at a time.', 'Close', {
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
        this.assignTeachers(result.class, result.section);
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
        this.assignTeacher(teacher, result.class, result.section);
      }
    });
  }

  assignTeachers(selectedClass: string, selectedSection: string): void {
    this.dataSource.data.forEach(teacher => {
      if (teacher.selected) {
        this.assignTeacher(teacher, selectedClass, selectedSection);
        teacher.selected = false;
      }
    });
    this.saveTeacherData();
    this.dataSource.data = [...this.teacherData];
  }

  assignTeacher(teacher: TeacherData, selectedClass: string, selectedSection: string): void {
    teacher.class = selectedClass;
    teacher.section = selectedSection;
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

  unassignTeacher(teacher: TeacherData): void {
    teacher.class = '';
    teacher.section = '';
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






















// ///pendind and assign together coming ///

// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatSnackBar } from '@angular/material/snack-bar';  // Import MatSnackBar for displaying error messages
// import { AddTeacherDialogComponent } from '../add-teacher-dialog/add-teacher-dialog.component';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

// interface TeacherData {
//   name: string;
//   class: string;
//   section: string;
//   status: string;
//   selected?: boolean;
// }

// @Component({
//   selector: 'app-teacher-master',
//   templateUrl: './teacher-master.component.html',
//   styleUrls: ['./teacher-master.component.css']
// })
// export class TeacherMasterComponent implements OnInit {
//   displayedColumns: string[] = ['select', 'name', 'class', 'section', 'status', 'action'];
//   dataSource: MatTableDataSource<TeacherData>;
//   teacherData: TeacherData[] = [];

//   constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {  // Inject MatSnackBar
//     this.dataSource = new MatTableDataSource<TeacherData>(this.teacherData);
//   }

//   ngOnInit(): void {
//     this.loadTeacherData();
//   }

//   loadTeacherData(): void {
//     const savedTeacherData = JSON.parse(localStorage.getItem('teacherData') || '[]');
//     const employees = JSON.parse(localStorage.getItem('employees') || '[]');
//     this.teacherData = employees
//       .filter((emp: any) => emp.role === 'teacher')
//       .map((emp: any) => {
//         const savedData = savedTeacherData.find((t: TeacherData) => t.name === emp.name) || {};
//         return {
//           name: emp.name,
//           class: savedData.class || '',
//           section: savedData.section || '',
//           status: savedData.status || 'Pending', // Default status
//           selected: false
//         };
//       });
//     this.dataSource.data = this.teacherData;
//   }

//   openAddTeacherDialog(): void {
//     const selectedTeachers = this.dataSource.data.filter(teacher => teacher.selected);
//     if (selectedTeachers.length === 0) return;

//     if (selectedTeachers.length > 5) {
//       this.snackBar.open('You can only assign up to 5 teachers at a time.', 'Close', {
//         duration: 3000,
//       });
//       return;
//     }

//     const dialogRef = this.dialog.open(AddTeacherDialogComponent, {
//       width: '400px',
//       data: { selectedTeachers }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.assignTeachers(result.class, result.section);
//       }
//     });
//   }

//   openAssignDialog(teacher: TeacherData): void {
//     const dialogRef = this.dialog.open(AddTeacherDialogComponent, {
//       width: '400px',
//       data: { selectedTeachers: [teacher] }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.assignTeacher(teacher, result.class, result.section);
//       }
//     });
//   }

//   assignTeachers(selectedClass: string, selectedSection: string): void {
//     this.dataSource.data.forEach(teacher => {
//       if (teacher.selected) {
//         this.assignTeacher(teacher, selectedClass, selectedSection);
//         teacher.selected = false;
//       }
//     });
//     this.saveTeacherData();
//     this.dataSource.data = [...this.teacherData];
//   }

//   assignTeacher(teacher: TeacherData, selectedClass: string, selectedSection: string): void {
//     teacher.class = selectedClass;
//     teacher.section = selectedSection;
//     teacher.status = 'Assigned';
//     this.saveTeacherData();
//   }

//   openUnassignDialog(teacher: TeacherData): void {
//     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
//       width: '300px',
//       data: { message: 'Do you want to unassign?' }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.unassignTeacher(teacher);
//       }
//     });
//   }

//   unassignTeacher(teacher: TeacherData): void {
//     teacher.class = '';
//     teacher.section = '';
//     teacher.status = 'Pending';
//     this.saveTeacherData();
//     this.dataSource.data = [...this.teacherData];
//   }

//   saveTeacherData(): void {
//     localStorage.setItem('teacherData', JSON.stringify(this.teacherData));
//   }

//   selectAll(event: any): void {
//     const checked = event.checked;
//     this.dataSource.data.forEach(teacher => {
//       teacher.selected = checked;
//     });
//   }
// }
