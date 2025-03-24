import { Component, inject } from '@angular/core';
import { HttpService } from '../../http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent 
{
    serviceToComponet: any = inject(HttpService);
    username: any = sessionStorage.getItem("username");
    getFromUrl: string = `http://localhost:8080/dashboard/${this.username}`;
    userData: any;

    constructor() 
    {
        this.serviceToComponet.getUser(this.getFromUrl).subscribe(

          (success: any) => {
            this.userData = success;
            console.log('User Data:', success);
          },
          (error: any) => {
            console.error('Error:', error);
          }
        )
    }

    greetUser():string
    {
        const dateRefvar= new Date();
        let hours = dateRefvar.getHours();

        if(hours < 12)      { return 'Good Morning';}
        else if(hours < 18) { return 'Good Afternoon';}
        else                { return 'Good Evening';}
    }

}
