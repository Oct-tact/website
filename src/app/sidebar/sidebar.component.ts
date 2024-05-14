import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
//   isAdmin: boolean = false;
//   userType: number = 0; // Assuming userType is a number
//   isStudentLoggedIn: boolean = false;
  

//   ngOnInit(): void {
//     // Retrieve user data from local storage or AuthService and set isAdmin and userType accordingly
//     const userData = localStorage.getItem('currentddUser');
//     if (userData) {
//       const currentddUser = JSON.parse(userData);
//       this.isAdmin = currentddUser.userType === 0;
//       this.userType = currentddUser.userType;
//     }
//   }
// }
isAdmin: boolean = false;
  isStudentLoggedIn: boolean = false;

  ngOnInit(): void {
    // Retrieve user data from local storage and set isAdmin and isStudentLoggedIn accordingly
    const currentddUserStr = localStorage.getItem('currentddUser');
    const currentUserStr = localStorage.getItem('currentUser');

    if (currentddUserStr !== null) {
      const currentddUser = JSON.parse(currentddUserStr);
      if (currentddUser.userType === 0) {
        this.isAdmin = true;
      }
    }

    if (currentUserStr !== null) {
      const currentUser = JSON.parse(currentUserStr);
      if (currentUser.userType === 1) {
        this.isStudentLoggedIn = true;
      }
    }
  }
}