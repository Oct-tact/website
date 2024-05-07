import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  sectio = [
    { name: 'A', sub: 'Maths', classTeacher: 'Pallavi Sharma', status: 'Present' },
    { name: 'B', sub: 'Science', classTeacher: 'Rashree Jain', status: 'Present' },
    { name: 'C', sub: 'SST', classTeacher: 'Vikas Yadav', status: 'Present' },
    { name: 'D', sub: 'Hindi', classTeacher: 'Ira Chaudhary', status: 'Present' },
    { name: 'E', sub: 'English', classTeacher: 'Kapil Sinha',status: 'Present' }
  ];
 
  sections = ['A', 'B', 'C', 'D', 'E'];
 // Define periods for each subject
 periods = [
  { time: '8:00-8:45', index: 0 },
  { time: '8:45-9:30', index: 1 },
  { time: '9:30-10:15', index: 2 },
  { time: '10:15-11:00', index: 3 },
  { time: '11:00-11:45', index: 4 },
  { time: '11:45-12:30', index: 5 },
  { time: '12:30-1:15', index: 6 },
  { time: '1:15-2:00', index: 7 },
];

// Initialize timetables for each section
sectionATimetable: any[] = [];
sectionBTimetable: any[] = [];
sectionCTimetable: any[] = [];
sectionDTimetable: any[] = [];
sectionETimetable: any[] = [];

constructor() { }

ngOnInit(): void {
  this.generateTimetable();
}



changeStatus(row: any, newStatus: string) {
  // Store the original subject before changing the status
  const originalSubject = row.sub;

  // Update the status
  row.status = newStatus;

  // Update the timetable when status changes
  if (newStatus === 'Absent') {
    this.updateTimetable(originalSubject, newStatus);
  } else if (newStatus === 'Present') {
    this.restoreTimetable(originalSubject);
  }
}

updateTimetable(subject: string, newStatus: string) {
  // Iterate through each section timetable
  for (let i = 0; i < this.periods.length; i++) {
    // Check if the subject matches in each section timetable
    if (this.sectionATimetable[i]?.subject === subject) {
      this.sectionATimetable[i].subject = newStatus + ': ' + subject; // Store both status and subject
    }
    if (this.sectionBTimetable[i]?.subject === subject) {
      this.sectionBTimetable[i].subject = newStatus + ': ' + subject;
    }
    if (this.sectionCTimetable[i]?.subject === subject) {
      this.sectionCTimetable[i].subject = newStatus + ': ' + subject;
    }
    if (this.sectionDTimetable[i]?.subject === subject) {
      this.sectionDTimetable[i].subject = newStatus + ': ' + subject;
    }
    if (this.sectionETimetable[i]?.subject === subject) {
      this.sectionETimetable[i].subject = newStatus + ': ' + subject;
    }
  }
}
restoreTimetable(subject: string) {
  // Iterate through each section timetable
  for (let i = 0; i < this.periods.length; i++) {
    // Check if the subject matches in each section timetable and if it includes status prefix
    if (this.sectionATimetable[i]?.subject.includes(subject) && this.sectionATimetable[i]?.subject !== subject) {
      // Remove the status prefix and store only the subject name
      this.sectionATimetable[i].subject = subject;
    }
    if (this.sectionBTimetable[i]?.subject.includes(subject) && this.sectionBTimetable[i]?.subject !== subject) {
      this.sectionBTimetable[i].subject = subject;
    }
    if (this.sectionCTimetable[i]?.subject.includes(subject) && this.sectionCTimetable[i]?.subject !== subject) {
      this.sectionCTimetable[i].subject = subject;
    }
    if (this.sectionDTimetable[i]?.subject.includes(subject) && this.sectionDTimetable[i]?.subject !== subject) {
      this.sectionDTimetable[i].subject = subject;
    }
    if (this.sectionETimetable[i]?.subject.includes(subject) && this.sectionETimetable[i]?.subject !== subject) {
      this.sectionETimetable[i].subject = subject;
    }
  }
}























generateTimetable(): void {
  // Assign subjects to sections systematically
  this.generateSectionTimetable('A', 0);
  this.generateSectionTimetable('B', 1);
  this.generateSectionTimetable('C', 2);
  this.generateSectionTimetable('D', 3);
  this.generateSectionTimetable('E', 4);
}

generateSectionTimetable(section: string, subjectIndex: number): void {
  // Initialize the timetable for the section
  let timetable: any[] = [];

  for (let i = 0; i < this.periods.length; i++) {
    const subject = this.getSubjectForPeriod(section, i);
    timetable.push({ time: this.periods[i].time, subject: subject });
  }

  // Assign the generated timetable to the corresponding section
  switch (section) {
    case 'A':
      this.sectionATimetable = timetable;
      break;
    case 'B':
      this.sectionBTimetable = timetable;
      break;
    case 'C':
      this.sectionCTimetable = timetable;
      break;
    case 'D':
      this.sectionDTimetable = timetable;
      break;
    case 'E':
      this.sectionETimetable = timetable;
      break;
    default:
      break;
  }
}
subjects = ['Maths', 'Science', 'SST', 'Hindi', 'English', 'Library', 'Games', 'Arts'];
getSubjectForPeriod(section: string, periodIndex: number): string {
  switch (section) {
    case 'A':
      return this.subjects[(0 + periodIndex) % this.subjects.length];
    case 'B':
      return this.subjects[(1 + periodIndex) % this.subjects.length];
    case 'C':
      return this.subjects[(2 + periodIndex) % this.subjects.length];
    case 'D':
      return this.subjects[(3 + periodIndex) % this.subjects.length];
    case 'E':
      return this.subjects[(4 + periodIndex) % this.subjects.length];
    default:
      return '';
  }
}
}