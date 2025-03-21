
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-register',
  imports: [ ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent 
{

  backendMessage:any="";
  serviceToComponet:any=inject(HttpService);
  postToUrl:string="http://localhost:8080/register";
  userForms:FormGroup;

    constructor()
    {
      this.userForms=new FormGroup({
        email:new FormControl('', [Validators.required,Validators.email]),
        fullname:new FormControl('', [Validators.required, Validators.minLength(4)]),
        username:new FormControl('', [Validators.required,Validators.minLength(3)]),
        password:new FormControl('',[Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),
        location:new FormControl('add location'),
        bio:new FormControl('add bio')
      
      })
    }

    onSubmit()
    {
      this.serviceToComponet.postUser(this.postToUrl,this.userForms.value).subscribe
      ( 
            (succesful: any) =>
            {
                console.log('User Created:', succesful);
                this.backendMessage=succesful;
                setTimeout(() => {
                this.backendMessage="";
                }, 5000);
                this.userForms.reset();
            },
            (error: any) =>
            {
                console.error('Error:', error);
                if(error.error instanceof ProgressEvent)
                {
                    this.backendMessage="Server is down, Please try again later!";
                    setTimeout(() => {
                        this.backendMessage="";
                    }, 5000);
                }
                else
                {
                    this.backendMessage=error.error|| "Something went wrong!"; 
                    setTimeout(() => {
                        this.backendMessage="";
                    }, 5000);
                }
            }
      );
    }

}