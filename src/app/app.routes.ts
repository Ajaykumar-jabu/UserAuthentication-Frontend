import { Routes } from '@angular/router';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { DashboardpageComponent } from './dashboardpage/dashboardpage.component';
import { LoginComponent } from './welcomepage/login/login.component';
import { RegisterComponent } from './welcomepage/register/register.component';
import { HomeComponent } from './dashboardpage/home/home.component';
import { ProfileComponent } from './dashboardpage/profile/profile.component';

export const routes: Routes = 
[
    {
        path:'',
        redirectTo:'welcomepage',
        pathMatch:'full'
    },

    {
        path:'welcomepage',
        component:WelcomepageComponent,
        children:
        [
            {
                path:'',
                redirectTo:'login',
                pathMatch:'full'
            },

            {   path:'login',
                component:LoginComponent 
            },

            {
                path:'register',
                component:RegisterComponent
            }
        ]
    },

    {
        path:'dashboard',
        component:DashboardpageComponent,
        children:
        [
            {
                path:'',
                redirectTo:'home',
                pathMatch:'full'
            },

            {   path:'home',
                component:HomeComponent 
            },

            {
                path:'profile',
                component:ProfileComponent
            }
        ]
    }
];
