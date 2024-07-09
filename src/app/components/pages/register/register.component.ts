import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserHelpersService } from '../../services/user-helpers.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // registerObj:any={
  //   username:'',
  //   email:'',
  //   password:'',
  // };

  registeratinForm:FormGroup;

  constructor(private router:Router,private ref:MatDialogRef<RegisterComponent>,private usersrv:UserHelpersService,private toast:ToastrService){

    this.registeratinForm=new FormGroup({
    username:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(3)]),
    });

  }

 


 
  

  onRegister(){
    //login  api
    console.log("clicked sumbmit")
    console.log(this.registeratinForm.value)

    this.usersrv.sendUserSignUpRequest(this.registeratinForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.toast.success("User Registered Successfully");
        
        this.ref.close();
        
        
      },
      error:(err)=>{
        
        console.log(err);
        this.toast.error("User Registration Failed");
        

        }
    })

    

   
  }




}
