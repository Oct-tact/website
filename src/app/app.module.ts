import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ContactComponent } from './contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';






import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';


import { MatDatepickerModule } from '@angular/material/datepicker';


import { MatNativeDateModule } from '@angular/material/core';


import { MatCardModule } from '@angular/material/card';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { DeleteTaskDialogComponent } from './delete-task-dialog/delete-task-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';


import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SidebarComponent } from './sidebar/sidebar.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { StudentRegisterComponent } from './student-register/student-register.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { DailyAttendanceComponent } from './daily-attendance/daily-attendance.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { StudentComponent } from './user-management/student/student.component';
import { EmployeeComponent } from './user-management/employee/employee.component';
import { StudentEditDialogComponent } from './student-edit-dialog/student-edit-dialog.component';
import { StudentDeleteDialogComponent } from './student-delete-dialog/student-delete-dialog.component';
import { StudentUpdatePasswordDialogComponent } from './student-update-password-dialog/student-update-password-dialog.component';
import { EmployeeEditDialogComponent } from './employee-edit-dialog/employee-edit-dialog.component';
import { EmployeeDeleteDialogComponent } from './employee-delete-dialog/employee-delete-dialog.component';
import { StudentAttendanceComponent } from './student-attendance/student-attendance.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    HomeComponent,
    ShopComponent,
    ContactComponent,
    AddTaskDialogComponent,
    EditTaskDialogComponent,
    DeleteTaskDialogComponent,
    DashboardComponent,
    SidebarComponent,
    PieChartComponent,
    StudentRegisterComponent,
    StudentLoginComponent,
    EmployeeRegisterComponent,
    EmployeeLoginComponent,
    DailyAttendanceComponent,
    AdminLoginComponent,
    UserManagementComponent,
    StudentComponent,
    EmployeeComponent,
    StudentEditDialogComponent,
    StudentDeleteDialogComponent,
    StudentUpdatePasswordDialogComponent,
    EmployeeEditDialogComponent,
    EmployeeDeleteDialogComponent,
    StudentAttendanceComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule, // Import MatFormFieldModule here
    MatInputModule, // Import MatInputModule here
    MatDatepickerModule, // Import MatDatepickerModule here
    MatNativeDateModule ,
    MatDialogModule,
    FormsModule,
    MatCardModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    MatSortModule,
    MatExpansionModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSelectModule,
    ReactiveFormsModule,
   
 
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
