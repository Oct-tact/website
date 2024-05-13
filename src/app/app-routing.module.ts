import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { DailyAttendanceComponent } from './daily-attendance/daily-attendance.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { StudentComponent } from './user-management/student/student.component';
import { EmployeeComponent } from './user-management/employee/employee.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';
import { AdminSAttendanceComponent } from './admin-s-attendance/admin-s-attendance.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path:'welcome',
    component:WelcomeComponent,
  },

  {
    path:'dashboard',
    component:DashboardComponent,
    children:[
      {path:'tasks', component:HomeComponent },
      {path:'tasksgraphs', component:ShopComponent },
      {path:'navbar', component:NavbarComponent },
      {path:'dailyatt', component:DailyAttendanceComponent },
    
        { path: 'student', component: StudentComponent },
        { path: 'employee', component: EmployeeComponent },
        { path: 'stuatt', component: StudentAttendanceComponent },
        { path: 'adminS', component: AdminSAttendanceComponent },
      
     ]
     },

    //  { path: 'usermanagement', component: UserManagementComponent, children: [
    //   { path: 'student', component: StudentComponent },
    //   { path: 'employee', component: EmployeeComponent }
    // ]},



     {
      path:'sturegister', component:StudentRegisterComponent ,
     },
     {
      path:'stulogin', component:StudentLoginComponent ,
     },
     {
      path:'employeelogin', component:EmployeeLoginComponent ,
     },
     {
      path:'employeeregister', component:EmployeeRegisterComponent ,
     },
     {
      path:'adminlogin', component:AdminLoginComponent ,
     }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
