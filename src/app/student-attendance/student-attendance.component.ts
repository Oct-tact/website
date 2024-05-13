import { Component, Output, EventEmitter } from '@angular/core';
import { MatCalendarCellClassFunction, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']
})
export class StudentAttendanceComponent {
// markInDate: Date | null = null; // Variable to store marked in date
//   markOutDate: Date | null = null; // Variable to store marked out date

//   constructor(private dateAdapter: DateAdapter<Date>) {}

//   // markIn(): void {
//   //   console.log('Mark In button clicked');
//   //   this.markInDate = new Date();
//   //   console.log('Marked In Date:', this.markInDate);
//   // }

//   // markOut(): void {
//   //   console.log('Mark Out button clicked');
//   //   this.markOutDate = new Date();
//   //   console.log('Marked Out Date:', this.markOutDate);
//   // }

//   markIn(): void {
//     console.log('Mark In button clicked');
//     const currentDate = new Date();
//     console.log('Marked In Date:', currentDate);
//     this.markInDate = currentDate;
//     // If marked in and out dates are the same, clear marked out
//     if (this.markOutDate && this.markOutDate.toDateString() === currentDate.toDateString()) {
//       this.markOutDate = null;
//     }
//   }

//   markOut(): void {
//     console.log('Mark Out button clicked');
//     const currentDate = new Date();
//     console.log('Marked Out Date:', currentDate);
//     this.markOutDate = currentDate;
//     // If marked in and out dates are the same, clear marked in
//     if (this.markInDate && this.markInDate.toDateString() === currentDate.toDateString()) {
//       this.markInDate = null;
//     }
//   }



//   dateClass: MatCalendarCellClassFunction<any> = (date: Date): MatCalendarCellCssClasses => {
//     console.log('Checking date:', date);

//     const day = this.dateAdapter.getDate(date);
//     console.log('Day:', day);

//     const currentDate = new Date();
//     console.log('Current Date:', currentDate);

//     if (this.markInDate && this.dateAdapter.sameDate(this.markInDate, date)) {
//       console.log('Marked In Date found');
//       return 'mark-in';
//     }

//     if (this.markOutDate && this.dateAdapter.sameDate(this.markOutDate, date)) {
//       console.log('Marked Out Date found');
//       return 'mark-out';
//     }

//     if (this.dateAdapter.sameDate(currentDate, date)) {
//       console.log('Today\'s Date');
//       return 'today';
//     }

//     return '';
//   };
// }




// markInDate: Date | null = null;
//   markOutDate: Date | null = null;

//   constructor(private dateAdapter: DateAdapter<Date>) {}

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
//   }

//   markIn(): void {
//     const currentDate = new Date();
//     this.markInDate = currentDate;
//     this.saveDateToLocalStorage('markInDate', currentDate, true);
//   }

//   markOut(): void {
//     const currentDate = new Date();
//     this.markOutDate = currentDate;
//     this.saveDateToLocalStorage('markOutDate', currentDate, false);
//   }

//   dateClass: MatCalendarCellClassFunction<any> = (date: Date): MatCalendarCellCssClasses => {
//     const day = this.dateAdapter.getDate(date);
//     const currentDate = new Date();

//     if (this.markInDate && this.dateAdapter.sameDate(this.markInDate, date)) {
//       return 'mark-in';
//     }

//     if (this.markOutDate && this.dateAdapter.sameDate(this.markOutDate, date)) {
//       return 'mark-out';
//     }

//     if (this.dateAdapter.sameDate(currentDate, date)) {
//       return 'today';
//     }

//     return '';
//   };

//   saveDateToLocalStorage(key: string, date: Date, isMarkedIn: boolean): void {
//     const markedDate = { date: date.toISOString(), isMarkedIn: isMarkedIn };
//     localStorage.setItem(key, JSON.stringify(markedDate));
//   }

//   getDateFromLocalStorage(key: string): { date: Date, isMarkedIn: boolean } | null {
//     const markedDateString = localStorage.getItem(key);
//     if (markedDateString) {
//       const markedDate = JSON.parse(markedDateString);
//       return { date: new Date(markedDate.date), isMarkedIn: markedDate.isMarkedIn };
//     }
//     return null;
//   }
// }


markInDate: Date | null = null;
markOutDate: Date | null = null;

constructor(private dateAdapter: DateAdapter<Date>) {}

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
}

markIn(): void {
  const currentDate = new Date();
  this.markInDate = currentDate;
  this.saveDateToLocalStorage('markInDate', currentDate, true);
  // Clear markOutDate if the same date was marked out
  if (this.markOutDate && this.isSameDate(currentDate, this.markOutDate)) {
    this.markOutDate = null;
    this.saveDateToLocalStorage('markOutDate', null, false);
  }
}

markOut(): void {
  const currentDate = new Date();
  this.markOutDate = currentDate;
  this.saveDateToLocalStorage('markOutDate', currentDate, false);
  // Clear markInDate if the same date was marked in
  if (this.markInDate && this.isSameDate(currentDate, this.markInDate)) {
    this.markInDate = null;
    this.saveDateToLocalStorage('markInDate', null, true);
  }
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

saveDateToLocalStorage(key: string, date: Date | null, isMarkedIn: boolean | null): void {
  const markedDate = { date: date ? date.toISOString() : null, isMarkedIn: isMarkedIn };
  localStorage.setItem(key, JSON.stringify(markedDate));
}

getDateFromLocalStorage(key: string): { date: Date | null, isMarkedIn: boolean | null } | null {
  const markedDateString = localStorage.getItem(key);
  if (markedDateString) {
    const markedDate = JSON.parse(markedDateString);
    return { date: markedDate.date ? new Date(markedDate.date) : null, isMarkedIn: markedDate.isMarkedIn };
  }
  return null;
}

isSameDate(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}
}