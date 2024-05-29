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
import { MatSnackBar } from '@angular/material/snack-bar'; 





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
import { AdminSAttendanceComponent } from './admin-s-attendance/admin-s-attendance.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EmployeeAttendanceComponent } from './employee-attendance/employee-attendance.component';
import { AdminEmployeeAttendanceComponent } from './admin-employee-attendance/admin-employee-attendance.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StudentLeaveComponent } from './student-leave/student-leave.component';
import { LeaveRequestDialogComponent } from './leave-request-dialog/leave-request-dialog.component';
import { UpdateLeaveComponent } from './update-leave/update-leave.component';
import { CancelLeaveDialogComponent } from './cancel-leave-dialog/cancel-leave-dialog.component';
import { ViewLeaveDialogComponent } from './view-leave-dialog/view-leave-dialog.component';
import { EmployeeLeaveComponent } from './employee-leave/employee-leave.component';
import { AdminLeaveApprovalComponent } from './admin-leave-approval/admin-leave-approval.component';
import { MatTabsModule } from '@angular/material/tabs';
import { EmployeeUpdatePasswordDialogComponent } from './employee-update-password-dialog/employee-update-password-dialog.component';
import { FeesMasterComponent } from './fees-master/fees-master.component';
import { AddFeesDialogComponent } from './add-fees-dialog/add-fees-dialog.component';
import { ViewFeesDialogComponent } from './view-fees-dialog/view-fees-dialog.component';
import { EditFeesDialogComponent } from './edit-fees-dialog/edit-fees-dialog.component';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { StatusConfirmationDialogComponent } from './status-confirmation-dialog/status-confirmation-dialog.component';
import { SubjectMasterComponent } from './subject-master/subject-master.component';
import { SubjectDialogComponent } from './subject-dialog/subject-dialog.component';
import { EditSubjectDialogComponent } from './edit-subject-dialog/edit-subject-dialog.component';
import { ViewSubjectDialogComponent } from './view-subject-dialog/view-subject-dialog.component';
import { SectionMasterComponent } from './section-master/section-master.component';
import { AddSectionDialogComponent } from './add-section-dialog/add-section-dialog.component';
import { EditSectionDialogComponent } from './edit-section-dialog/edit-section-dialog.component';
import { ViewSectionDialogComponent } from './view-section-dialog/view-section-dialog.component';
import { TeacherMasterComponent } from './teacher-master/teacher-master.component';
import { AddTeacherDialogComponent } from './add-teacher-dialog/add-teacher-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { EmployeeViewDialogComponent } from './employee-view-dialog/employee-view-dialog.component';
import { StudentViewDialogComponent } from './student-view-dialog/student-view-dialog.component';
import { RegularTeacherComponent } from './regular-teacher/regular-teacher.component';
import { PrivateTeacherComponent } from './private-teacher/private-teacher.component';
import { BothTeacherComponent } from './both-teacher/both-teacher.component';
import { StudentFeesComponent } from './student-fees/student-fees.component';
import { StudentFeesManagementComponent } from './student-fees-management/student-fees-management.component';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { QuarterPayDialogComponent } from './quarter-pay-dialog/quarter-pay-dialog.component';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';


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
    AdminSAttendanceComponent,
    WelcomeComponent,
    EmployeeAttendanceComponent,
    AdminEmployeeAttendanceComponent,
    StudentLeaveComponent,
    LeaveRequestDialogComponent,
    UpdateLeaveComponent,
    CancelLeaveDialogComponent,
    ViewLeaveDialogComponent,
    EmployeeLeaveComponent,
    AdminLeaveApprovalComponent,
    EmployeeUpdatePasswordDialogComponent,
    FeesMasterComponent,
    AddFeesDialogComponent,
    ViewFeesDialogComponent,
    EditFeesDialogComponent,
    DeleteConfirmationDialogComponent,
    StatusConfirmationDialogComponent,
    SubjectMasterComponent,
    SubjectDialogComponent,
    EditSubjectDialogComponent,
    ViewSubjectDialogComponent,
    SectionMasterComponent,
    AddSectionDialogComponent,
    EditSectionDialogComponent,
    ViewSectionDialogComponent,
    TeacherMasterComponent,
    AddTeacherDialogComponent,
    ConfirmDialogComponent,
    EmployeeViewDialogComponent,
    StudentViewDialogComponent,
    RegularTeacherComponent,
    PrivateTeacherComponent,
    BothTeacherComponent,
    StudentFeesComponent,
    StudentFeesManagementComponent,
    PaymentDialogComponent,
    QuarterPayDialogComponent,
    SuccessDialogComponent,
  
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
    MatSnackBarModule,
    MatTabsModule,
    MatCheckboxModule
   
 
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
