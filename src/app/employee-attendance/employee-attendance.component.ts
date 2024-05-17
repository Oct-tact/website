import { Component, Output, EventEmitter } from '@angular/core';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css']
})
export class EmployeeAttendanceComponent {
 
// markInDate: Date | null = null;
// markOutDate: Date | null = null;
// attendanceRecords: { date: string, time: string, attendance: string }[] = [];
// currentUser: any;
// showMarkOutButton: boolean = false;

// constructor(private dateAdapter: DateAdapter<Date>) {
//   this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
// }

// ngOnInit(): void {
//   // Retrieve marked dates from local storage
//   const markedIn = this.getDateFromLocalStorage('markInDate');
//   const markedOut = this.getDateFromLocalStorage('markOutDate');

//   if (markedIn) {
//     this.markInDate = markedIn.date;
//   }

//   if (markedOut) {
//     this.markOutDate = markedOut.date;
//   }

//   // Load existing attendance records for the current user or initialize an empty array
//   const userRecordsKey = `attendanceRecords_${this.currentUser.role}`;
//   const currentUserAttendanceRecords = JSON.parse(localStorage.getItem(userRecordsKey) || '[]');
//   if (currentUserAttendanceRecords.length > 0) {
//     this.attendanceRecords = currentUserAttendanceRecords;
//   }
// }

// markIn(): void {
//   const currentDate = new Date();
//   this.markInDate = currentDate;
//   this.addAttendanceRecord(currentDate, 'Mark In');
//   this.saveDateToLocalStorage('markInDate', currentDate);
//   this.showMarkOutButton = true; // Show the "Mark Out" button after marking in
// }

// markOut(): void {
//   const currentDate = new Date();
//   this.markOutDate = currentDate;
//   this.addAttendanceRecord(currentDate, 'Mark Out');
//   this.saveDateToLocalStorage('markOutDate', currentDate);
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

// saveDateToLocalStorage(key: string, date: Date): void {
//   localStorage.setItem(key, JSON.stringify({ date: date.toISOString() }));
// }

// addAttendanceRecord(date: Date, action: string): void {
//   const formattedDate = date.toLocaleDateString();
//   const formattedTime = date.toLocaleTimeString();
//   const record = { date: formattedDate, time: formattedTime, attendance: action };

//   // Save the attendance record specifically for the current user
//   const userRecordsKey = `attendanceRecords_${this.currentUser.role}`;
//   const currentUserRecords = JSON.parse(localStorage.getItem(userRecordsKey) || '[]');
//   currentUserRecords.push(record);
//   localStorage.setItem(userRecordsKey, JSON.stringify(currentUserRecords));

//   // Update the local array for display
//   this.attendanceRecords.push(record);
// }

// getDateFromLocalStorage(key: string): { date: Date | null } | null {
//   const markedDateString = localStorage.getItem(key);
//   if (markedDateString) {
//     const markedDate = JSON.parse(markedDateString);
//     return { date: markedDate.date ? new Date(markedDate.date) : null };
//   }
//   return null;
// }

// isSameDate(date1: Date, date2: Date): boolean {
//   return date1.getFullYear() === date2.getFullYear() &&
//     date1.getMonth() === date2.getMonth() &&
//     date1.getDate() === date2.getDate();
// }
// }

markInDate: Date | null = null;
markOutDate: Date | null = null;
attendanceRecords: { date: string, markInTime: string | null, markOutTime: string | null, status: string, adminStatus?: string }[] = [];
currentUser: any;
showMarkOutButton: boolean = false;
autoMarkInTimer: any;

constructor(private dateAdapter: DateAdapter<Date>) {
  this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
}

ngOnInit(): void {
  const userRecordsKey = `attendanceRecords_${this.currentUser.role}`;
  const currentUserAttendanceRecords = JSON.parse(localStorage.getItem(userRecordsKey) || '[]');
  if (currentUserAttendanceRecords.length > 0) {
    this.attendanceRecords = currentUserAttendanceRecords;
  } else {
    const defaultRecord = {
      date: new Date().toLocaleDateString(),
      markInTime: null,
      markOutTime: null,
      status: 'Pending'
    };
    this.attendanceRecords.push(defaultRecord);
    this.saveAttendanceRecordsToLocalStorage();
  }
  this.loadAdminAttendanceStatus(); // Load admin attendance status
  this.loadButtonStates(); // Load button states from local storage
}

loadAdminAttendanceStatus(): void {
  const adminAttendanceData = JSON.parse(localStorage.getItem('studentAttendanceByAdmin') || '[]');
  if (adminAttendanceData && adminAttendanceData.length > 0) {
    const adminRecord = adminAttendanceData.find((record: any) => record.name === this.currentUser.name);
    if (adminRecord) {
      this.attendanceRecords.forEach(record => {
        record.adminStatus = adminRecord.status;
      });
    }
  }
}

loadButtonStates(): void {
  const buttonStates = JSON.parse(localStorage.getItem(`buttonStates_${this.currentUser.role}`) || '{}');
  this.markInDate = buttonStates.markInDate ? new Date(buttonStates.markInDate) : null;
  this.showMarkOutButton = buttonStates.showMarkOutButton || false;
}

saveButtonStates(): void {
  const buttonStates = {
    markInDate: this.markInDate,
    showMarkOutButton: this.showMarkOutButton
  };
  localStorage.setItem(`buttonStates_${this.currentUser.role}`, JSON.stringify(buttonStates));
}

markIn(): void {
  const currentDate = new Date();
  this.markInDate = currentDate;
  this.updateAttendanceRecord(currentDate, 'Mark In');
  this.showMarkOutButton = true;
  this.saveButtonStates(); // Save button states to local storage
  this.showMarkInButtonAfterDelay();
}

markOut(): void {
  const currentDate = new Date();
  this.markOutDate = currentDate;
  this.updateAttendanceRecord(currentDate, 'Mark Out');
  this.showMarkOutButton = false;
  this.saveButtonStates(); // Save button states to local storage
  this.showMarkInButtonAfterDelay();
}

updateAttendanceRecord(date: Date, action: string): void {
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  const existingRecordIndex = this.attendanceRecords.findIndex(record => record.date === formattedDate);
  if (existingRecordIndex !== -1) {
    if (action === 'Mark In') {
      this.attendanceRecords[existingRecordIndex].markInTime = formattedTime;
      this.attendanceRecords[existingRecordIndex].status = 'Mark In';
    } else {
      this.attendanceRecords[existingRecordIndex].markOutTime = formattedTime;
      this.attendanceRecords[existingRecordIndex].status = 'Mark Out';
    }
  } else {
    const record = {
      date: formattedDate,
      markInTime: action === 'Mark In' ? formattedTime : null,
      markOutTime: action === 'Mark Out' ? formattedTime : null,
      status: action === 'Mark In' ? 'Mark In' : 'Pending'
    };
    this.attendanceRecords.push(record);
  }

  this.saveAttendanceRecordsToLocalStorage();
}

saveAttendanceRecordsToLocalStorage(): void {
  const userRecordsKey = `attendanceRecords_${this.currentUser.role}`;
  localStorage.setItem(userRecordsKey, JSON.stringify(this.attendanceRecords));
}

showMarkInButtonAfterDelay(): void {
  setTimeout(() => {
    this.showMarkOutButton = false;
    this.markInDate = null;
    this.markOutDate = null;
    this.saveButtonStates(); // Save button states to local storage after delay
  }, 60000);
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
