import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-timetable',
  templateUrl: './student-timetable.component.html',
  styleUrls: ['./student-timetable.component.css']
})
export class StudentTimetableComponent implements OnInit {
  class!: string;
  section!: string;
  timetable: any = {};
  displayedColumns: string[] = ['time', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  periods: { time: string }[] = [
    { time: '8:00am-8:40am' },
    { time: '8:40am-9:20am' },
    { time: '9:20am-10:00am' },
    { time: '10:00am-10:40am' },
    { time: 'LUNCH BREAK' },
    { time: '11:20am-12:00pm' },
    { time: '12:00pm-12:40pm' },
    { time: '12:40pm-1:20pm' },
    { time: '1:20pm-2:00pm' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (currentUser && currentUser.email) {
      this.class = currentUser.class;
      this.section = currentUser.section;
      this.loadTimetable();
    } else {
      // Handle case where student data is not found
      console.error('Student not found');
      this.router.navigate(['/stulogin']); // Redirect to login page
    }
  }

  loadTimetable(): void {
    const timetableData = JSON.parse(localStorage.getItem('timetableData') || '[]');
    const timetableEntry = timetableData.find((entry: any) => entry.class === this.class && entry.section === this.section);
    this.timetable = timetableEntry ? timetableEntry : {};
  }
}
