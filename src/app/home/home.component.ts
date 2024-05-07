import {Component, ViewChild} from '@angular/core';
import { AddTaskDialogComponent } from './../add-task-dialog/add-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteTaskDialogComponent } from './../delete-task-dialog/delete-task-dialog.component';
import { EditTaskDialogComponent } from './../edit-task-dialog/edit-task-dialog.component';

export interface Task {
  title: string;
  description: string;
  startDate: any;
  endDate: any;
  status: string;
  // You can add more properties if needed
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
//   displayedColumns: string[] = ['title', 'description','startdate', 'enddate', 'status','action'];
//   dataSource = new MatTableDataSource<any>();
  

//   @ViewChild(MatSort) sort!: MatSort;
//   isVendor: boolean = false;


//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private dialog: MatDialog
//   ) { }
    

//   ngOnInit(): void {
//   }
     
   

//   editRow(row: any): void {
//     const dialogRef = this.dialog.open(EditTaskDialogComponent, {
//       width: '400px',
//       data: { ...row }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         const index = this.dataSource.data.findIndex(item => item.title === row.title);
//         this.dataSource.data[index] = result;
//         this.dataSource._updateChangeSubscription();
//     // Update task in local storage
//     const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
//     tasks[index] = result;
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }
// });
// }

//   deleteRow(row: any): void {
//     const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
//       width: '60%',
//       data: { ...row }
//     });

//     dialogRef.afterClosed().subscribe(confirmation => {
//       if (confirmation) {
//         const index = this.dataSource.data.findIndex(item => item.id === row.id);
//         this.dataSource.data.splice(index, 1);
//         this.dataSource._updateChangeSubscription();
//       // Update local storage to remove deleted task
//       const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
//       tasks.splice(index, 1);
//       localStorage.setItem('tasks', JSON.stringify(tasks));
//     }
//   });
// }
//   // changeStatus(row: Task, newStatus: string) {
//   //   row.status = newStatus;
//   // }
  
//   changeStatus(row: Task, newStatus: string) {
//     row.status = newStatus;
  
//     // Update status in local storage
//     const index = this.dataSource.data.findIndex(item => item.title === row.title);
//     const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
//     tasks[index].status = newStatus;
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }
  


//   // Method to open the add user dialog
//   openAddUserDialog(): void {
//     const dialogRef = this.dialog.open(AddTaskDialogComponent, {
//       width: '400px',
//       data: {} // Pass any necessary data to the dialog if needed
//     });

//     dialogRef.afterClosed().subscribe(newUser => {
//       if (newUser) {
//         newUser.id = this.generateUniqueId();
//         // Add the new user to the data source
//         newUser.status = 'ToDo';
//         this.dataSource.data.push(newUser);
//         // Update the table
//         this.dataSource._updateChangeSubscription();
//            // Save to local storage
//            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
//            tasks.push(newUser);
//            localStorage.setItem('tasks', JSON.stringify(tasks));
//          }
//        });
//      }
     
//      generateUniqueId(): number {
//       // Generate a unique ID based on existing task IDs
//       const maxId = this.dataSource.data.length > 0 ? Math.max(...this.dataSource.data.map(item => item.id)) : 0;
//       return maxId + 1;
//     }
//    }







// displayedColumns: string[] = ['title', 'description', 'startdate', 'enddate', 'status', 'action'];
// dataSource = new MatTableDataSource<any>();
// totalTodo: number = 0;
// totalPending: number = 0;
// totalComplete: number = 0;

// @ViewChild(MatSort) sort!: MatSort;
// isVendor: boolean = false;

// constructor(
//   private route: ActivatedRoute,
//   private router: Router,
//   private dialog: MatDialog
// ) { }

// ngOnInit(): void {
//   this.dataSource.sort = this.sort;
//   this.loadTasks();
//   this.calculateCounts();
// }

// loadTasks() {
//   const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
//   this.dataSource.data = tasks;
// }

// calculateCounts() {
//   this.totalTodo = this.dataSource.data.length;
//   this.totalPending = this.dataSource.data.filter((row: { status: string; }) => row.status === 'Pending').length;
//   this.totalComplete = this.dataSource.data.filter((row: { status: string; }) => row.status === 'Complete').length;
// }

// editRow(row: any): void {
//   const dialogRef = this.dialog.open(EditTaskDialogComponent, {
//     width: '400px',
//     data: { ...row }
//   });

//   dialogRef.afterClosed().subscribe(result => {
//     if (result) {
//       const index = this.dataSource.data.findIndex((item: { title: string; }) => item.title === row.title);
//       this.dataSource.data[index] = result;
//       this.updateLocalStorage();
//       this.calculateCounts();
//     }
//   });
// }

// deleteRow(row: any): void {
//   const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
//     width: '60%',
//     data: { ...row }
//   });

//   dialogRef.afterClosed().subscribe(confirmation => {
//     if (confirmation) {
//       const index = this.dataSource.data.findIndex((item: { id: any; }) => item.id === row.id);
//       this.dataSource.data.splice(index, 1);
//       this.updateLocalStorage();
//       this.calculateCounts();
//     }
//   });
// }

// changeStatus(row: any, newStatus: string) {
//   row.status = newStatus;
//   this.updateLocalStorage();
//   this.calculateCounts();
// }

// openAddUserDialog(): void {
//   const dialogRef = this.dialog.open(AddTaskDialogComponent, {
//     width: '400px',
//     data: {} // Pass any necessary data to the dialog if needed
//   });

//   dialogRef.afterClosed().subscribe(newUser => {
//     if (newUser) {
//       newUser.id = this.generateUniqueId();
//       newUser.status = 'ToDo';
//       this.dataSource.data.push(newUser);
//       this.updateLocalStorage();
//       this.calculateCounts();
//     }
//   });
// }

// generateUniqueId(): number {
//   const maxId = this.dataSource.data.length > 0 ? Math.max(...this.dataSource.data.map((item: { id: any; }) => item.id)) : 0;
//   return maxId + 1;
// }

// updateLocalStorage() {
//   localStorage.setItem('tasks', JSON.stringify(this.dataSource.data));
// }

// }

displayedColumns: string[] = ['title', 'description', 'startdate', 'enddate', 'status', 'action'];
dataSource = new MatTableDataSource<any>();
filteredDataSource = new MatTableDataSource<Task>([]);
totalTodo: number = 0;
totalPending: number = 0;
totalComplete: number = 0;

@ViewChild(MatSort) sort!: MatSort;
isVendor: boolean = false;

constructor(
  private route: ActivatedRoute,
  private router: Router,
  private dialog: MatDialog
) { }

applyStatusFilter(event: any) {
  console.log('Status filter applied:', event.value); // Add this line to check if the method is triggered
  const filterValue = event.value;
  if (filterValue === 'all') {
    console.log('All tasks:', this.dataSource.filteredData); // Log all tasks
    this.dataSource.filter = '';
  } else {
    console.log(`${filterValue} tasks:`); // Log filtered tasks
    this.dataSource.filterPredicate = (data: Task, filter: string) => {
      return data.status === filterValue;
    };
    this.dataSource.filter = filterValue;
  }
}


// Ensure to update your applyFilter function to reset status filter when search is applied



applyFilter(event: any): void {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}




ngOnInit(): void {
  this.dataSource.sort = this.sort;
  this.loadTasks();
  this.calculateCounts();
}

loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  this.dataSource.data = tasks;
 
}

calculateCounts() {
  this.totalTodo = this.dataSource.data.length;
  this.totalPending = this.dataSource.data.filter((row: { status: string; }) => row.status === 'Pending').length;
  this.totalComplete = this.dataSource.data.filter((row: { status: string; }) => row.status === 'Complete').length;
}

editRow(row: any): void {
  const dialogRef = this.dialog.open(EditTaskDialogComponent, {
    width: '400px',
    data: { ...row }
  });
  let originalStatus: string; // Declare the variable here
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      const index = this.dataSource.data.findIndex((item: { title: string; }) => item.title === row.title);
      originalStatus = this.dataSource.data[index].status;
      this.dataSource.data[index] = result;

      this.dataSource._updateChangeSubscription(); // Manually trigger change detection

      // Update counts based on status change
      if (originalStatus !== result.status) {
        if (originalStatus === 'Pending') {
          this.totalPending--;
        } else if (originalStatus === 'Complete') {
          this.totalComplete--;
        }

        if (result.status === 'Pending') {
          this.totalPending++;
        } else if (result.status === 'Complete') {
          this.totalComplete++;
        }
      }
      this.updateLocalStorage();
      this.calculateCounts();
     
      
      // this.calculateCounts();
    }
  });
}

deleteRow(row: any): void {
  const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
    width: '60%',
    data: { ...row }
  });
  let deletedStatus: string;
  dialogRef.afterClosed().subscribe(confirmation => {
    if (confirmation) {
      const index = this.dataSource.data.findIndex((item: { id: any; }) => item.id === row.id);
      deletedStatus = this.dataSource.data[index].status; 
      this.dataSource.data.splice(index, 1);
   
      this.dataSource._updateChangeSubscription(); // Manually trigger change detection

      // Update counts based on deleted task's status
      if (deletedStatus === 'Pending') {
        this.totalPending--;
      } else if (deletedStatus === 'Complete') {
        this.totalComplete--;
      }

      this.updateLocalStorage();
      this.calculateCounts();
    }
  });
}

changeStatus(row: any, newStatus: string) {
  row.status = newStatus;
  this.updateLocalStorage();
  this.calculateCounts();
}

openAddUserDialog(): void {
  const dialogRef = this.dialog.open(AddTaskDialogComponent, {
    width: '400px',
    data: {} // Pass any necessary data to the dialog if needed
  });

  dialogRef.afterClosed().subscribe(newUser => {
    if (newUser) {
      newUser.id = this.generateUniqueId();
      newUser.status = 'ToDo';

      // Add the new task to the data source
      this.dataSource.data.push(newUser);
    
      this.dataSource._updateChangeSubscription(); // Manually trigger change detection

      // Update the counts
      this.totalTodo++;
      if (newUser.status === 'Pending') {
        this.totalPending++;
      } else if (newUser.status === 'Complete') {
        this.totalComplete++;
      }

      // Save to local storage
      this.updateLocalStorage();
    }
  });
}

generateUniqueId(): number {
  const maxId = this.dataSource.data.length > 0 ? Math.max(...this.dataSource.data.map((item: { id: any; }) => item.id)) : 0;
  return maxId + 1;
}

updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(this.dataSource.data));
}
}
