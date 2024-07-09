import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterComponent } from '../register/register.component';

import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { CookieService } from 'ngx-cookie-service';
import { DialogRef } from '@angular/cdk/dialog';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})



export class LoginComponent {


  loginForm:FormGroup;//form declare

  

  constructor(private router:Router,private ref:MatDialogRef<LoginComponent>
              ,private dialogue:MatDialog,private toast: ToastrService
              ,private authSrv:AuthService,private cookie: CookieService,
              private dialgueRef1:DialogRef){
                
    //reactive form initialization  
    this.loginForm=new FormGroup({
        email:new FormControl('',[Validators.required,Validators.email]),
        password:new FormControl('',[Validators.required,Validators.minLength(3)]),
      })
  } 
  

  onLogIn(){
    //login  api
    
   
    if(this.loginForm.valid){
      // console.log(this.loginForm.value )
     
      this.authSrv.login(this.loginForm.value).subscribe({
        next:(response)=>{
                // console.log(response)
                if(response!=null){



                  this.cookie.set('Authorization', 
                                  `Bearer ${response.token}`,
                                   undefined, '/',
                                   undefined, true, 
                                   'Strict');
                // console.log(response.userId)
                localStorage.setItem("userId",response.userId.toString());
                this.authSrv.decodeToken(response.token)
                let user = this.authSrv.getUser();
                console.log(user);
                if (user.role == 'ADMIN') {
                  this.toast.success("Login Admin successfully");
                  this.router.navigate(['/']);
                  this.dialgueRef1.close();
                } else if (user.role == 'USER') {
                  this.toast.success("Login User successfully");
                  this.dialogue.closeAll();
                  this.router.navigate(['/']);
                  this.dialgueRef1.close();
                }
              }
            },
            error:(err)=>{
              
              this.toast.warning("Invalid User");
        }

      })
         

     

      console.log("clicked sumbmit")
      
    }else{
      console.log("invalid form")
    }

   

  }

  //open register dialogue==>
  onRegisterClick(){
    this.openDialogue();
  }
  openDialogue(){
    this.dialogue.open(RegisterComponent,{
    
      width:"auto",
      height:"auto",      
      
    })
  }
  


}
