import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TimetableFormDialogComponent } from '../timetable-form-dialog/timetable-form-dialog.component';
import { EditTimetableDialogComponent } from '../edit-timetable-dialog/edit-timetable-dialog.component';
import { DeleteTimetableDialogComponent } from '../delete-timetable-dialog/delete-timetable-dialog.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-create-timetable',
  templateUrl: './create-timetable.component.html',
  styleUrls: ['./create-timetable.component.css']
})
export class CreateTimetableComponent {
  timetableForm: FormGroup;
  classOptions: string[] = ['KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII'];
  sectionOptions: string[] = [];
  allSections: any[] = [];
  timetableData: any[] = [];
  savedClassesSections: any[] = [];
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

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['time', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  displayedColumnsSaved: string[] = ['sno', 'class', 'section', 'action'];
  showTimetable: boolean = false;
  constructor(private fb: FormBuilder, public dialog: MatDialog, private router: Router) {
    this.timetableForm = this.fb.group({
      class: ['', Validators.required],
      section: ['', Validators.required]
    });
  }

  // ngOnInit(): void {
  //   this.allSections = JSON.parse(localStorage.getItem('sectionData') || '[]');
  //   this.timetableData = JSON.parse(localStorage.getItem('timetableData') || '[]');
  //   this.savedClassesSections = JSON.parse(localStorage.getItem('savedClassesSections') || '[]');
  // }

    ngOnInit(): void {
    this.allSections = JSON.parse(localStorage.getItem('sectionData') || '[]');
    this.timetableData = JSON.parse(localStorage.getItem('timetableData') || '[]');
    this.savedClassesSections = JSON.parse(localStorage.getItem('savedClassesSections') || '[]');
    this.dataSource = new MatTableDataSource(this.savedClassesSections);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  generateTimetable(): void {
    this.showTimetable = true; // Show the timetable when generate button is clicked
}
  onClassChange(selectedClass: string): void {
    this.sectionOptions = this.allSections
      .filter(section => section.class === selectedClass)
      .map(section => section.section);
      this.showTimetable = false; // Hide the timetable after saving
  }

  onSubmit(): void {
    if (this.timetableForm.valid) {
      const timetableEntry = {
        class: this.timetableForm.value.class,
        section: this.timetableForm.value.section
      };
      this.timetableData.push(timetableEntry);
      this.saveTimetableData();
    
    }

  }

  saveTimetableData(): void {
    localStorage.setItem('timetableData', JSON.stringify(this.timetableData));
  }

  saveClassSection(): void {
    if (this.timetableForm.valid) {
      const classSectionEntry = {
        class: this.timetableForm.value.class,
        section: this.timetableForm.value.section,
        timetable: this.getTimetableForClassSection(this.timetableForm.value.class, this.timetableForm.value.section)
      };
  
      // Save entry to local storage
      const savedEntries = JSON.parse(localStorage.getItem('savedClassesSections') || '[]');
      savedEntries.push(classSectionEntry);
      localStorage.setItem('savedClassesSections', JSON.stringify(savedEntries));
      
      // Update the component state
      this.savedClassesSections = savedEntries;
      this.showTimetable = false; // Hide the timetable after saving
      // this.router.navigate(['dashboard/timetableG']);
    }
  }
  

  getTimetableForClassSection(selectedClass: string, selectedSection: string): any {
    return this.timetableData.filter(entry => entry.class === selectedClass && entry.section === selectedSection);
  }

  openForm(day: string, period: { time: string }): void {
    const dialogRef = this.dialog.open(TimetableFormDialogComponent, {
      width: '400px',
      data: { day, period }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTimetable(day, period.time, result);
        this.saveTimetableData();
      }
    });
  }

  updateTimetable(day: string, time: string, data: any): void {
    const entry = this.timetableData.find(entry => entry.class === this.timetableForm.value.class && entry.section === this.timetableForm.value.section);
    if (entry) {
      entry[day] = entry[day] || {};
      entry[day][time] = data;
    } else {
      const newEntry = {
        class: this.timetableForm.value.class,
        section: this.timetableForm.value.section,
        [day]: {
          [time]: data
        }
      };
      this.timetableData.push(newEntry);
    }
  }

  openEditForm(day: string, period: { time: string }): void {
    const entry = this.getTimetableEntry(day, period.time);
    const dialogRef = this.dialog.open(EditTimetableDialogComponent, {
      width: '400px',
      data: { day, period, entry }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTimetable(day, period.time, result);
        this.saveTimetableData();
      }
    });
  }

  openDeleteForm(day: string, period: { time: string }): void {
    const dialogRef = this.dialog.open(DeleteTimetableDialogComponent, {
      width: '400px',
      data: { day, period }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTimetableEntry(day, period.time);
        this.saveTimetableData();
      }
    });
  }

  deleteTimetableEntry(day: string, time: string): void {
    const entryIndex = this.timetableData.findIndex(entry => entry.class === this.timetableForm.value.class && entry.section === this.timetableForm.value.section);
    if (entryIndex !== -1) {
      delete this.timetableData[entryIndex][day][time];
      if (Object.keys(this.timetableData[entryIndex][day]).length === 0) {
        delete this.timetableData[entryIndex][day];
      }
      if (Object.keys(this.timetableData[entryIndex]).filter(key => key !== 'class' && key !== 'section').length === 0) {
        this.timetableData.splice(entryIndex, 1);
      }
    }
  }

  getTimetableEntry(day: string, time: string): any {
    const entry = this.timetableData.find(entry => entry.class === this.timetableForm.value.class && entry.section === this.timetableForm.value.section);
    return entry && entry[day] && entry[day][time] ? entry[day][time] : null;
  }

  viewClassSection(element: any): void {
    this.router.navigate(['view-timetable', { class: element.class, section: element.section }]);
  }
}




