import { Component, inject,  } from '@angular/core';
import { HttpService } from '../../http.service';
import { FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule,} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

    userData: any;
    isEditabled: boolean = false;
    backendMessage: string = '';
    private serviceToComponet: any = inject(HttpService);
    username: any = sessionStorage.getItem("username");
    getFromUrl: string = `http://localhost:8080/dashboard/${this.username}`;
    putFromUrl: string = `http://localhost:8080/dashboard/update/${this.username}`;
    userData2:FormGroup=new FormGroup
    (
        {
            fullname: new FormControl(''),  
            username: new FormControl({ value: '', disabled: false }),
            password:new FormControl({ value: '', disabled: false }),
            email: new FormControl(''),
            location: new FormControl(''),
            bio: new FormControl('')
        }
    );

    constructor(private router: Router) 
    {
        
        this.serviceToComponet.getUser(this.getFromUrl).subscribe
        (
            (success: any) => 
            {
                this.userData = success;
                this.userData2.patchValue({
                fullname: this.userData.fullname,
                username: this.userData.username,
                password:this.userData.password,
                email: this.userData.email,
                location: this.userData.location,
                bio: this.userData.bio
                });
            }, (error: any) => {}
        )

    }

    editProfile() 
    {
        this.isEditabled = !this.isEditabled;
    }

    saveUser() 
    {   console.log(this.putFromUrl);
        const userDataToSend = this.userData2.getRawValue();
        this.serviceToComponet.putUser(this.putFromUrl,userDataToSend).subscribe
        (
            (success:any)=>
            {
                this.backendMessage = success;
                console.log("success block");
                setTimeout(() => {
                this.backendMessage = "";
                }, 2000);
            },  
            (error:any)=>{
                console.log("error block");
                this.backendMessage = error.error;
                setTimeout(() => {
                this.backendMessage = "";
                }, 2000);
            }
        )
    }

    navToLogin() 
    {
        this.router.navigate(['welcomepage/login']);
    }

}
