import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpService } from '../../http.service';
import { User } from '../../../user.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent 
{   
    userForms: FormGroup;
    backendMessage: any = "";
    postToUrl: string = "http://localhost:8080/login";
    serviceToComponet:any = inject(HttpService);
    

    constructor(private router: Router)
    {
        this.userForms = new FormGroup(
        {
        username: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(8),])
        } )
    }

    onSubmit() 
    {       
            this.serviceToComponet.postUser(this.postToUrl, this.userForms.value as User).subscribe
            (
                (succesful: any) => 
                {
                    this.backendMessage = succesful;
                    sessionStorage.setItem("username", this.userForms.value.username);
                    console.log(this.backendMessage);
                    setTimeout(() => {
                        this.backendMessage="";
                    }, 3000);
                    setTimeout(() => {
                        this.router.navigate(['/dashboard']);
                    }, 1000);
                },
                (error: any) => 
                {
                    if(error.error instanceof ProgressEvent)
                    {
                        this.backendMessage = "Server is down! Please try again later!";
                        setTimeout(() => {
                        this.backendMessage="";
                        }, 5000);
                    }
                    else
                    { this.backendMessage = error.error || "Something went wrong!";
                        console.error('Error:', error);
                        setTimeout(() => {
                        this.backendMessage = "";
                        }, 5000);
                    }
                }
            )
    }

}
