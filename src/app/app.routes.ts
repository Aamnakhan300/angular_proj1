import { Routes } from '@angular/router';
import { LoginSignupComponent } from './Pages/login-signup/login-signup.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: LoginSignupComponent },
    {path:"loginsignup",component:LoginSignupComponent},
    {path:"Pages/dashboard",component:DashboardComponent}
];
