import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet,Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterOutlet,],
  templateUrl: './dashboardpage.component.html',
  styleUrl: './dashboardpage.component.css'
})
export class DashboardpageComponent 
{
    isNavOpen = false;
    navSessionAction:string = sessionStorage.getItem("username") ? 'Logout' : 'Login';

    constructor(private router: Router) { }

    logout() 
    {
        console.log("Logout");
        sessionStorage.removeItem("username");
        setTimeout(() => 
        {
            this.router.navigate(['welcomepage/login']);
        }, 800);
    }

    toggleNav() 
    {
        this.isNavOpen = !this.isNavOpen;
    }
}
