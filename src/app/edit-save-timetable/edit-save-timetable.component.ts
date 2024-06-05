// import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { TimetableFormDialogComponent } from '../timetable-form-dialog/timetable-form-dialog.component';
// import { EditTimetableDialogComponent } from '../edit-timetable-dialog/edit-timetable-dialog.component';
// import { DeleteTimetableDialogComponent } from '../delete-timetable-dialog/delete-timetable-dialog.component';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';



// @Component({
//   selector: 'app-edit-save-timetable',
//   templateUrl: './edit-save-timetable.component.html',
//   styleUrls: ['./edit-save-timetable.component.css']
// })
// export class EditSaveTimetableComponent {
 
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { TimetableFormDialogComponent } from '../timetable-form-dialog/timetable-form-dialog.component';
// import { EditTimetableDialogComponent } from '../edit-timetable-dialog/edit-timetable-dialog.component';
// import { DeleteTimetableDialogComponent } from '../delete-timetable-dialog/delete-timetable-dialog.component';
// import { MatTableDataSource } from '@angular/material/table';

// @Component({
//   selector: 'app-edit-save-timetable',
//   templateUrl: './edit-save-timetable.component.html',
//   styleUrls: ['./edit-save-timetable.component.css']
// })
// export class EditSaveTimetableComponent implements OnInit {
//   timetableForm: FormGroup;
//   class!: string;
//   section!: string;
//   timetableData: any = [];
//   savedClassesSections: any[] = [];
//   dataSource!: MatTableDataSource<any>;
//   periods: { time: string }[] = [
//     { time: '8:00am-8:40am' },
//     { time: '8:40am-9:20am' },
//     { time: '9:20am-10:00am' },
//     { time: '10:00am-10:40am' },
//     { time: 'LUNCH BREAK' },
//     { time: '11:20am-12:00pm' },
//     { time: '12:00pm-12:40pm' },
//     { time: '12:40pm-1:20pm' },
//     { time: '1:20pm-2:00pm' }
//   ];

//   constructor(
//     private route: ActivatedRoute,
//     private fb: FormBuilder,
//     public dialog: MatDialog
//   ) {
//     this.timetableForm = this.fb.group({
//       class: ['', Validators.required],
//       section: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       this.class = params['class'];
//       this.section = params['section'];
//       this.timetableData = JSON.parse(localStorage.getItem('timetableData') || '[]');
//     this.savedClassesSections = JSON.parse(localStorage.getItem('savedClassesSections') || '[]');
//     this.dataSource = new MatTableDataSource(this.savedClassesSections);
//       this.loadTimetableData();
//     });
//   }

//   loadTimetableData(): void {
//     const savedTimetableData = JSON.parse(localStorage.getItem('savedClassesSections') || '[]');
//     const entry = savedTimetableData.find((data: any) => data.class === this.class && data.section === this.section);

//     if (entry) {
//       this.timetableData = entry.timetable;
//       this.timetableForm.patchValue({
//         class: this.class,
//         section: this.section
//       });
//     }
//   }

//   onSubmit(): void {
//     if (this.timetableForm.valid) {
//       const timetableEntry = {
//         class: this.timetableForm.value.class,
//         section: this.timetableForm.value.section
//       };
//       this.timetableData.push(timetableEntry);
//       this.saveTimetableData();
    
//     }

//   }

//   saveTimetableData(): void {
//     localStorage.setItem('timetableData', JSON.stringify(this.timetableData));
//     const savedEntries = JSON.parse(localStorage.getItem('savedClassesSections') || '[]');
//     const entryIndex = savedEntries.findIndex((data: any) => data.class === this.class && data.section === this.section);

//     if (entryIndex !== -1) {
//       savedEntries[entryIndex].timetable = this.timetableData;
//     } else {
//       const newEntry = {
//         class: this.class,
//         section: this.section,
//         timetable: this.timetableData
//       };
//       savedEntries.push(newEntry);
//     }

//     localStorage.setItem('savedClassesSections', JSON.stringify(savedEntries));
//   }

 

//   getTimetableEntry(day: string, time: string): any {
//     const entry = this.timetableData.find((entry: any) => entry.class === this.class && entry.section === this.section);
//     return entry && entry[day] && entry[day][time] ? entry[day][time] : null;
//   }

//   openForm(day: string, period: { time: string }): void {
//     const dialogRef = this.dialog.open(TimetableFormDialogComponent, {
//       width: '400px',
//       data: { day, period }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.updateTimetable(day, period.time, result);
//         this.saveTimetableData();
//       }
//     });
//   }

//   updateTimetable(day: string, time: string, data: any): void {
//     const entry = this.timetableData.find((entry: any) => entry.class === this.class && entry.section === this.section);
//     if (entry) {
//       entry[day] = entry[day] || {};
//       entry[day][time] = data;
//     } else {
//       const newEntry = {
//         class: this.class,
//         section: this.section,
//         [day]: {
//           [time]: data
//         }
//       };
//       this.timetableData.push(newEntry);
//     }
//   }

//   openEditForm(day: string, period: { time: string }): void {
//     const entry = this.getTimetableEntry(day, period.time);
//     const dialogRef = this.dialog.open(EditTimetableDialogComponent, {
//       width: '400px',
//       data: { day, period, entry }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.updateTimetable(day, period.time, result);
//         this.saveTimetableData();
//       }
//     });
//   }

//   openDeleteForm(day: string, period: { time: string }): void {
//     const dialogRef = this.dialog.open(DeleteTimetableDialogComponent, {
//       width: '400px',
//       data: { day, period }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.deleteTimetableEntry(day, period.time);
//         this.saveTimetableData();
//       }
//     });
//   }

//   deleteTimetableEntry(day: string, time: string): void {
//     const entryIndex = this.timetableData.findIndex((entry: any) => entry.class === this.class && entry.section === this.section);
//     if (entryIndex !== -1) {
//       delete this.timetableData[entryIndex][day][time];
//       if (Object.keys(this.timetableData[entryIndex][day]).length === 0) {
//         delete this.timetableData[entryIndex][day];
//       }
//       if (Object.keys(this.timetableData[entryIndex]).filter(key => key !== 'class' && key !== 'section').length === 0) {
//         this.timetableData.splice(entryIndex, 1);
//       }
//     }
//   }


//   saveClassSection(): void {
//     if (this.timetableForm.valid) {
//       this.saveTimetableData();
//     }
//   }
// }



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TimetableFormDialogComponent } from '../timetable-form-dialog/timetable-form-dialog.component';
import { EditTimetableDialogComponent } from '../edit-timetable-dialog/edit-timetable-dialog.component';
import { DeleteTimetableDialogComponent } from '../delete-timetable-dialog/delete-timetable-dialog.component';

@Component({
  selector: 'app-edit-save-timetable',
  templateUrl: './edit-save-timetable.component.html',
  styleUrls: ['./edit-save-timetable.component.css']
})
export class EditSaveTimetableComponent implements OnInit {
  timetableForm: FormGroup;
  class!: string;
  section!: string;
  timetableData: any = [];

  periods: { time: string }[] = [
    { time: '8:00am-8:40am' },
    { time: '8:40am-9:20am' },
    { time: '9:20am-10:00am' },
    { time: '10:00am-10:40am' },
    { time: 'LUNCH BREAK' },
    { time: '11:20am-12:00pm' },
    { time: '12:00pm-12:40pm' },
    { time: '12:40pm-1:20pm' },
    { time: '1:20pm-2:00pm' }
  ];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.timetableForm = this.fb.group({
      class: ['', Validators.required],
      section: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.class = params['class'];
      this.section = params['section'];
      this.loadTimetableData();
    });
  }

  loadTimetableData(): void {
    const savedTimetableData = JSON.parse(localStorage.getItem('savedClassesSections') || '[]');
    const entry = savedTimetableData.find((data: any) => data.class === this.class && data.section === this.section);

    if (entry) {
      this.timetableData = entry.timetable;
      this.timetableForm.patchValue({
        class: this.class,
        section: this.section
      });
    }
  }

  getTimetableEntry(day: string, time: string): any {
    const entry = this.timetableData.find((entry: any) => entry.class === this.class && entry.section === this.section);
    return entry && entry[day] && entry[day][time] ? entry[day][time] : null;
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
    const entry = this.timetableData.find((entry: any) => entry.class === this.class && entry.section === this.section);
    if (entry) {
      entry[day] = entry[day] || {};
      entry[day][time] = data;
    } else {
      const newEntry = {
        class: this.class,
        section: this.section,
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
    const entryIndex = this.timetableData.findIndex((entry: any) => entry.class === this.class && entry.section === this.section);
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

  saveTimetableData(): void {
    localStorage.setItem('timetableData', JSON.stringify(this.timetableData));
    const savedEntries = JSON.parse(localStorage.getItem('savedClassesSections') || '[]');
    const entryIndex = savedEntries.findIndex((data: any) => data.class === this.class && data.section === this.section);

    if (entryIndex !== -1) {
      savedEntries[entryIndex].timetable = this.timetableData;
    } else {
      const newEntry = {
        class: this.class,
        section: this.section,
        timetable: this.timetableData
      };
      savedEntries.push(newEntry);
    }

    localStorage.setItem('savedClassesSections', JSON.stringify(savedEntries));
  }

  saveClassSection(): void {
    if (this.timetableForm.valid) {
      this.saveTimetableData();
    }
  }
}
