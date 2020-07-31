import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { StudentComponent} from './student/student.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { DataComponent } from './data/data.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'Data',component:DataComponent},
  {path:'Student',component:StudentComponent,canActivate:[AuthGuard]},
  {path:'Login',component:LoginComponent},
  {path:'Signup/:id',component:SignupComponent},
  {path:'Signup',component:SignupComponent},
  {path:'Studentdetails/:id',component:StudentDetailsComponent},
  {path:'',redirectTo:'/Home',pathMatch:'full'},
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
