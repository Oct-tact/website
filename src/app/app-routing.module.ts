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


const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent,
    children:[
      {path:'tasks', component:HomeComponent },
      {path:'tasksgraphs', component:ShopComponent },
      {path:'navbar', component:NavbarComponent },
   
     ]
     }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
