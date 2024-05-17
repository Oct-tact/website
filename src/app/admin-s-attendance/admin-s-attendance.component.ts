// import { Component } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';

// @Component({
//   selector: 'app-admin-s-attendance',
//   templateUrl: './admin-s-attendance.component.html',
//   styleUrls: ['./admin-s-attendance.component.css']
// })
// export class AdminSAttendanceComponent {
// //   students: { name: string, status: string }[] = [];
// //   displayedColumns: string[] = ['name', 'status', 'action'];
// //   dataSource: MatTableDataSource<any>;

// //   constructor() {
// //     this.dataSource = new MatTableDataSource<any>(this.students);
// //   }

// //   ngOnInit(): void {
// //     // Retrieve student attendance from local storage
// //     const savedAttendance = localStorage.getItem('studentAttendance');
// //     if (savedAttendance) {
// //       this.students = JSON.parse(savedAttendance);
// //     } else {
// //       // Retrieve student names from local storage
// //       const studentData = JSON.parse(localStorage.getItem('students') || '[]');
// //       this.students = studentData.map((student: any) => ({ name: student.name, status: 'Present' }));
// //       // Save initial data to local storage
// //       this.saveAttendance();
// //     }
// //     this.dataSource.data = this.students;
// //   }

// //   markAttendance(student: { name: string, status: string }, status: string): void {
// //     student.status = status;
// //     this.saveAttendance();
// //   }

// //   saveAttendance(): void {
// //     localStorage.setItem('studentAttendance', JSON.stringify(this.students));
// //   }
// // }

// // students: { name: string, status: string }[] = [];
// //   displayedColumns: string[] = ['name', 'status', 'action'];
// //   dataSource: MatTableDataSource<any>;

// //   constructor() {
// //     this.dataSource = new MatTableDataSource<any>(this.students);
// //   }

// //   ngOnInit(): void {
// //     // Retrieve student names from local storage
// //     const studentData = JSON.parse(localStorage.getItem('students') || '[]');
    
// //     // Initialize students array with all registered students
// //     this.students = studentData.map((student: any) => ({ name: student.name, status: 'Not Marked' }));
    
// //     // Update attendance status if available in local storage
// //     const savedAttendance = JSON.parse(localStorage.getItem('studentAttendance') || '{}');
// //     if (savedAttendance && savedAttendance.length > 0) {
// //       this.students.forEach((student, index) => {
// //         const attendanceStatus = savedAttendance.find((attendee: any) => attendee.name === student.name);
// //         if (attendanceStatus) {
// //           this.students[index].status = attendanceStatus.status;
// //         }
// //       });
// //     }

// //     this.dataSource.data = this.students;
// //   }

// //   markAttendance(student: { name: string, status: string }, status: string): void {
// //     student.status = status;
// //     this.saveAttendance();
// //   }

// //   saveAttendance(): void {
// //     localStorage.setItem('studentAttendance', JSON.stringify(this.students));
// //   }
// // }





// students: { name: string, status: string }[] = [];
// displayedColumns: string[] = ['name', 'rollNumber','status', 'action'];
// dataSource: MatTableDataSource<any>;

// constructor() {
//   this.dataSource = new MatTableDataSource<any>(this.students);
// }

// ngOnInit(): void {
//   // Retrieve student names from local storage
//   const studentData = JSON.parse(localStorage.getItem('students') || '[]');

//   // Initialize students array with all registered students
//   this.students = studentData.map((student: any) => ({ name: student.name,  rollNumber: student.rollNumber,status: 'Not Marked' }));

//   // Reset attendance status on the next day
//   this.resetAttendanceOnNextDay();

//   // Load attendance status from local storage
//   this.loadAttendanceStatus();
// }

// markAttendance(student: { name: string,rollNumber:string, status: string }, status: string): void {
//   student.status = status;
//   this.saveAttendance();
// }

// resetAttendanceOnNextDay(): void {
//   const currentDate = new Date().toDateString();
//   const lastAttendanceDate = localStorage.getItem('attendanceDate');
//   if (lastAttendanceDate !== currentDate) {
//     this.students.forEach(student => {
//       student.status = 'Not Marked';
//     });
//     localStorage.setItem('attendanceDate', currentDate);
//     this.saveAttendance();
//   }
// }

// loadAttendanceStatus(): void {
//   const savedAttendance = JSON.parse(localStorage.getItem('studentAttendance') || '[]');
//   if (savedAttendance && savedAttendance.length > 0) {
//     this.students.forEach((student, index) => {
//       const attendanceStatus = savedAttendance.find((attendee: any) => attendee.name === student.name);
//       if (attendanceStatus) {
//         this.students[index].status = attendanceStatus.status;
//       }
//     });
//   }
//   this.dataSource.data = this.students;
// }

// saveAttendance(): void {
//   localStorage.setItem('studentAttendance', JSON.stringify(this.students));
// }

// // saveAttendance(): void {
// //   const currentDate = new Date().toDateString();
// //   const attendanceData = { date: currentDate, attendance: this.students };
// //   localStorage.setItem('studentAttendance', JSON.stringify(attendanceData));
// // }

// }


import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-s-attendance',
  templateUrl: './admin-s-attendance.component.html',
  styleUrls: ['./admin-s-attendance.component.css']
})
export class AdminSAttendanceComponent {              
  students: { name: string, rollNumber: string, status: string }[] = [];
  displayedColumns: string[] = ['name', 'rollNumber', 'status', 'action'];
  dataSource: MatTableDataSource<any>;

  constructor() {
    this.dataSource = new MatTableDataSource<any>(this.students);
  }

  ngOnInit(): void {
    // Retrieve student names from local storage
    const studentData = JSON.parse(localStorage.getItem('students') || '[]');

    // Initialize students array with all registered students
    this.students = studentData.map((student: any) => ({
      name: student.name,
      rollNumber: student.rollNumber,
      status: 'Not Marked'
    }));

    // Reset attendance status on the next day
    this.resetAttendanceOnNextDay();

    // Load attendance status from local storage
    this.loadAttendanceStatus();
  }

  markAttendance(student: { name: string, rollNumber: string, status: string }, status: string): void {
    student.status = status;
    this.saveAttendance();
    this.updateStudentAttendance(student.name, status); // Update student attendance status
  }

  resetAttendanceOnNextDay(): void {
    const currentDate = new Date().toDateString();
    const lastAttendanceDate = localStorage.getItem('attendanceDate');
    if (lastAttendanceDate !== currentDate) {
      this.students.forEach(student => {
        student.status = 'Not Marked';
      });
      localStorage.setItem('attendanceDate', currentDate);
      this.saveAttendance();
    }
  }

  loadAttendanceStatus(): void {
    const savedAttendance = JSON.parse(localStorage.getItem('studentAttendance') || '[]');
    if (savedAttendance && savedAttendance.length > 0) {
      this.students.forEach((student, index) => {
        const attendanceStatus = savedAttendance.find((attendee: any) => attendee.name === student.name);
        if (attendanceStatus) {
          this.students[index].status = attendanceStatus.status;
        }
      });
    }
    this.dataSource.data = this.students;
  }

  saveAttendance(): void {
    localStorage.setItem('studentAttendance', JSON.stringify(this.students));
  }

  updateStudentAttendance(studentName: string, status: string): void {
    const studentAttendance = JSON.parse(localStorage.getItem('studentAttendanceByAdmin') || '[]');
    const studentRecord = studentAttendance.find((record: any) => record.name === studentName);
    if (studentRecord) {
      studentRecord.status = status;
    } else {
      studentAttendance.push({ name: studentName, status: status });
    }
    localStorage.setItem('studentAttendanceByAdmin', JSON.stringify(studentAttendance));
  }
}
