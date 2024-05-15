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
// markOutDate: Date | null = null;
// attendanceRecords: { date: string, markInTime: string | null, markOutTime: string | null, status: string }[] = [];
// currentUser: any;
// showMarkOutButton: boolean = false;
// autoMarkInTimer: any;

// constructor(private dateAdapter: DateAdapter<Date>) {
//   this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
// }

// ngOnInit(): void {
//   // Load existing attendance records for the current user or initialize an empty array
//   const userRecordsKey = `attendanceRecords_${this.currentUser.rollNumber}`;
//   const currentUserAttendanceRecords = JSON.parse(localStorage.getItem(userRecordsKey) || '[]');
//   if (currentUserAttendanceRecords.length > 0) {
//     this.attendanceRecords = currentUserAttendanceRecords;
//   }
 
//   const markedIn = this.getDateFromLocalStorage('markInDate');
//   const markedOut = this.getDateFromLocalStorage('markOutDate');

//   if (markedIn) {
//     this.markInDate = markedIn.date;
//     this.showMarkOutButton = true; // Show "Mark Out" button if already marked in
//   }

//   if (markedOut) {
//     this.markOutDate = markedOut.date;
//   }
// }

// markIn(): void {
//   const currentDate = new Date();
//   this.markInDate = currentDate;
//   this.updateAttendanceRecord(currentDate, 'Mark In');
//   this.showMarkOutButton = true; // Show the "Mark Out" button after marking in
// }

// markOut(): void {
//   const currentDate = new Date();
//   this.markOutDate = currentDate;
//   this.updateAttendanceRecord(currentDate, 'Mark Out');
//   this.showMarkOutButton = false; // Hide the "Mark Out" button after marking out
// }

// updateAttendanceRecord(date: Date, action: string): void {
//   const formattedDate = date.toLocaleDateString();
//   const formattedTime = date.toLocaleTimeString();

//   // Find the existing record and update its markInTime or markOutTime
//   const existingRecordIndex = this.attendanceRecords.findIndex(record => record.date === formattedDate);
//   if (existingRecordIndex !== -1) {
//     if (action === 'Mark In') {
//       this.attendanceRecords[existingRecordIndex].markInTime = formattedTime;
//       this.attendanceRecords[existingRecordIndex].status = 'Mark In';
//     } else {
//       this.attendanceRecords[existingRecordIndex].markOutTime = formattedTime;
//       this.attendanceRecords[existingRecordIndex].status = 'Mark Out';
//     }
//   } else {
//     const record = {
//       date: formattedDate,
//       markInTime: action === 'Mark In' ? formattedTime : null,
//       markOutTime: action === 'Mark Out' ? formattedTime : null,
//       status: 'Pending'
//     };
//     this.attendanceRecords.push(record);
//   }

//   this.saveAttendanceRecordsToLocalStorage();
// }

// saveAttendanceRecordsToLocalStorage(): void {
//   const userRecordsKey = `attendanceRecords_${this.currentUser.rollNumber}`;
//   localStorage.setItem(userRecordsKey, JSON.stringify(this.attendanceRecords));
// }

// saveDateToLocalStorage(key: string, date: Date): void {
//   localStorage.setItem(key, JSON.stringify({ date: date.toISOString() }));
// }


// addAttendanceRecord(date: Date, action: string): void {
//   const formattedDate = date.toLocaleDateString();
//   const formattedTime = date.toLocaleTimeString();

//   // Update status based on action
//   const status = action === 'Mark In' ? 'Mark In' : 'Mark Out';

//   // Find the existing record index
//   const existingRecordIndex = this.attendanceRecords.findIndex(record => record.date === formattedDate);

//   if (existingRecordIndex !== -1) {
//     if (action === 'Mark In') {
//       this.attendanceRecords[existingRecordIndex].markInTime = formattedTime;
//       this.attendanceRecords[existingRecordIndex].status = status;
//     } else {
//       this.attendanceRecords[existingRecordIndex].markOutTime = formattedTime;
//       this.attendanceRecords[existingRecordIndex].status = status;
//     }
//   } else {
//     // Create a new record
//     const record = {
//       date: formattedDate,
//       markInTime: action === 'Mark In' ? formattedTime : null,
//       markOutTime: action === 'Mark Out' ? formattedTime : null,
//       status: status
//     };
//     this.attendanceRecords.push(record);
//   }

//   // Save the updated records to local storage
//   this.saveAttendanceRecordsToLocalStorage();
// }



// getDateFromLocalStorage(key: string): { date: Date | null } | null {
//   const markedDateString = localStorage.getItem(key);
//   if (markedDateString) {
//     const markedDate = JSON.parse(markedDateString);
//     return { date: markedDate.date ? new Date(markedDate.date) : null };
//   }
//   return null;
// }

// dateClass: MatCalendarCellClassFunction<any> = (date: Date): MatCalendarCellCssClasses => {
//   const currentDate = new Date();

//   if (this.markInDate && this.isSameDate(date, this.markInDate)) {
//     return 'mark-in';
//   }

//   if (this.markOutDate && this.isSameDate(date, this.markOutDate)) {
//     return 'mark-out';
//   }

//   if (this.isSameDate(date, currentDate)) {
//     return 'today';
//   }

//   return '';
// };

// isSameDate(date1: Date, date2: Date): boolean {
//   return date1.getFullYear() === date2.getFullYear() &&
//     date1.getMonth() === date2.getMonth() &&
//     date1.getDate() === date2.getDate();
// }
// }

















  markInDate: Date | null = null;
  markOutDate: Date | null = null;
  attendanceRecords: { date: string, markInTime: string | null, markOutTime: string | null, status: string }[] = [];
  currentUser: any;
  showMarkOutButton: boolean = false;
  autoMarkInTimer: any;

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  ngOnInit(): void {
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
    this.updateAttendanceRecord(currentDate, 'Mark In');
    this.showMarkOutButton = true; // Show the "Mark Out" button after marking in
    this.showMarkInButtonAfterDelay();
  }
  

  markOut(): void {
    const currentDate = new Date();
    this.markOutDate = currentDate;
    this.updateAttendanceRecord(currentDate, 'Mark Out');
    this.showMarkOutButton = false; // Hide the "Mark Out" button after marking out
    this.showMarkInButtonAfterDelay();
  }



  updateAttendanceRecord(date: Date, action: string): void {
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
  
    // Find the existing record and update its markInTime or markOutTime
    const existingRecordIndex = this.attendanceRecords.findIndex(record => record.date === formattedDate);
    if (existingRecordIndex !== -1) {
      if (action === 'Mark In') {
        this.attendanceRecords[existingRecordIndex].markInTime = formattedTime;
        this.attendanceRecords[existingRecordIndex].status = 'Mark In'; // Update status directly to "Mark In"
      } else {
        this.attendanceRecords[existingRecordIndex].markOutTime = formattedTime;
        this.attendanceRecords[existingRecordIndex].status = 'Mark Out';
      }
    } else {
      const record = {
        date: formattedDate,
        markInTime: action === 'Mark In' ? formattedTime : null,
        markOutTime: action === 'Mark Out' ? formattedTime : null,
        status: action === 'Mark In' ? 'Mark In' : 'Pending' // Update status directly to "Mark In" if action is "Mark In"
      };
      this.attendanceRecords.push(record);
    }
  
    this.saveAttendanceRecordsToLocalStorage();
  }

  saveAttendanceRecordsToLocalStorage(): void {
    const userRecordsKey = `attendanceRecords_${this.currentUser.rollNumber}`;
    localStorage.setItem(userRecordsKey, JSON.stringify(this.attendanceRecords));
  }

 
  showMarkInButtonAfterDelay(): void {
    setTimeout(() => {
      this.showMarkOutButton = false;
      this.markInDate = null; // Reset markInDate after delay
      this.markOutDate = null; // Reset markOutDate after delay
    }, 60000); // 60 seconds in milliseconds
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

isSameDate(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}
}
