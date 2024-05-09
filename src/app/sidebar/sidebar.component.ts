import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isAdmin: boolean = false;
  userType: number = 0; // Assuming userType is a number

  

  ngOnInit(): void {
    // Retrieve user data from local storage or AuthService and set isAdmin and userType accordingly
    const userData = localStorage.getItem('currentddUser');
    if (userData) {
      const currentddUser = JSON.parse(userData);
      this.isAdmin = currentddUser.userType === 0;
      this.userType = currentddUser.userType;
    }
  }
}

