import { Component, Output, EventEmitter } from '@angular/core';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']
})
export class StudentAttendanceComponent {


// markInDate: Date | null = null;
//   markOutDate: Date | null = null;
//   attendanceRecords: { date: string, time: string, attendance: string }[] = JSON.parse(localStorage.getItem('attendanceRecords') || '[]');
//   currentUser: any;
//   showMarkOutButton: boolean = false;
//   constructor(private dateAdapter: DateAdapter<Date>) {
//     this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
//   }

//   ngOnInit(): void {
//     // Retrieve marked dates from local storage
//     const markedIn = this.getDateFromLocalStorage('markInDate');
//     const markedOut = this.getDateFromLocalStorage('markOutDate');

//     if (markedIn) {
//       this.markInDate = markedIn.date;
//     }

//     if (markedOut) {
//       this.markOutDate = markedOut.date;
//     }
//       // Load existing attendance records or initialize an empty array
//      // Load existing attendance records for the current user or initialize an empty array
//      const currentUserAttendanceRecords = JSON.parse(localStorage.getItem(`attendanceRecords_${this.currentUser.rollNumber}`) || '[]');
//      if (currentUserAttendanceRecords.length > 0) {
//          this.attendanceRecords = currentUserAttendanceRecords;
//      }
//   }

//   markIn(): void {
//     const currentDate = new Date();
//     this.markInDate = currentDate;
//     this.addAttendanceRecord(currentDate, 'Mark In');
//     this.saveDateToLocalStorage('markInDate', currentDate);
//     this.showMarkOutButton = true;
//   }

//   markOut(): void {
//     const currentDate = new Date();
//     this.markOutDate = currentDate;
//     this.addAttendanceRecord(currentDate, 'Mark Out');
//     this.saveDateToLocalStorage('markOutDate', currentDate);
//   }

//   dateClass: MatCalendarCellClassFunction<any> = (date: Date): MatCalendarCellCssClasses => {
//     const currentDate = new Date();

//     if (this.markInDate && this.isSameDate(date, this.markInDate)) {
//       return 'mark-in';
//     }

//     if (this.markOutDate && this.isSameDate(date, this.markOutDate)) {
//       return 'mark-out';
//     }

//     if (this.isSameDate(date, currentDate)) {
//       return 'today';
//     }

//     return '';
//   };

//   saveDateToLocalStorage(key: string, date: Date): void {
//     localStorage.setItem(key, JSON.stringify({ date: date.toISOString() }));
//   }

//   addAttendanceRecord(date: Date, action: string): void {
//     const formattedDate = date.toLocaleDateString();
//     const formattedTime = date.toLocaleTimeString();
//     const record = { date: formattedDate, time: formattedTime, attendance: action };
//     this.attendanceRecords.push(record);
//     localStorage.setItem('attendanceRecords', JSON.stringify(this.attendanceRecords));
//   }

//   getDateFromLocalStorage(key: string): { date: Date | null } | null {
//     const markedDateString = localStorage.getItem(key);
//     if (markedDateString) {
//       const markedDate = JSON.parse(markedDateString);
//       return { date: markedDate.date ? new Date(markedDate.date) : null };
//     }
//     return null;
//   }

//   isSameDate(date1: Date, date2: Date): boolean {
//     return date1.getFullYear() === date2.getFullYear() &&
//       date1.getMonth() === date2.getMonth() &&
//       date1.getDate() === date2.getDate();
//   }
// }

markInDate: Date | null = null;
  markOutDate: Date | null = null;
  attendanceRecords: { date: string, time: string, attendance: string }[] = [];
  currentUser: any;
  showMarkOutButton: boolean = false;

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  ngOnInit(): void {
    // Retrieve marked dates from local storage
    const markedIn = this.getDateFromLocalStorage('markInDate');
    const markedOut = this.getDateFromLocalStorage('markOutDate');

    if (markedIn) {
      this.markInDate = markedIn.date;
    }

    if (markedOut) {
      this.markOutDate = markedOut.date;
    }

    // Load existing attendance records for the current user or initialize an empty array
    const userRecordsKey = `attendanceRecords_${this.currentUser.rollNumber}`;
    const currentUserAttendanceRecords = JSON.parse(localStorage.getItem(userRecordsKey) || '[]');
    if (currentUserAttendanceRecords.length > 0) {
      this.attendanceRecords = currentUserAttendanceRecords;
    }
  }

  markIn(): void {
    const currentDate = new Date();
    this.markInDate = currentDate;
    this.addAttendanceRecord(currentDate, 'Mark In');
    this.saveDateToLocalStorage('markInDate', currentDate);
    this.showMarkOutButton = true; // Show the "Mark Out" button after marking in
  }

  markOut(): void {
    const currentDate = new Date();
    this.markOutDate = currentDate;
    this.addAttendanceRecord(currentDate, 'Mark Out');
    this.saveDateToLocalStorage('markOutDate', currentDate);
  }

  dateClass: MatCalendarCellClassFunction<any> = (date: Date): MatCalendarCellCssClasses => {
    const currentDate = new Date();

    if (this.markInDate && this.isSameDate(date, this.markInDate)) {
      return 'mark-in';
    }

    if (this.markOutDate && this.isSameDate(date, this.markOutDate)) {
      return 'mark-out';
    }

    if (this.isSameDate(date, currentDate)) {
      return 'today';
    }

    return '';
  };

  saveDateToLocalStorage(key: string, date: Date): void {
    localStorage.setItem(key, JSON.stringify({ date: date.toISOString() }));
  }

  addAttendanceRecord(date: Date, action: string): void {
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    const record = { date: formattedDate, time: formattedTime, attendance: action };

    // Save the attendance record specifically for the current user
    const userRecordsKey = `attendanceRecords_${this.currentUser.rollNumber}`;
    const currentUserRecords = JSON.parse(localStorage.getItem(userRecordsKey) || '[]');
    currentUserRecords.push(record);
    localStorage.setItem(userRecordsKey, JSON.stringify(currentUserRecords));

    // Update the local array for display
    this.attendanceRecords.push(record);
  }

  getDateFromLocalStorage(key: string): { date: Date | null } | null {
    const markedDateString = localStorage.getItem(key);
    if (markedDateString) {
      const markedDate = JSON.parse(markedDateString);
      return { date: markedDate.date ? new Date(markedDate.date) : null };
    }
    return null;
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }
}