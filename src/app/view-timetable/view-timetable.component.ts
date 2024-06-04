import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-timetable',
  templateUrl: './view-timetable.component.html',
  styleUrls: ['./view-timetable.component.css']
})
export class ViewTimetableComponent implements OnInit {
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.class = params.get('class') || '';
      this.section = params.get('section') || '';
      this.loadTimetable();
    });
  }

  loadTimetable(): void {
    const timetableData = JSON.parse(localStorage.getItem('timetableData') || '[]');
    const timetableEntry = timetableData.find((entry: any) => entry.class === this.class && entry.section === this.section);
    this.timetable = timetableEntry ? timetableEntry : {};
  }
}
