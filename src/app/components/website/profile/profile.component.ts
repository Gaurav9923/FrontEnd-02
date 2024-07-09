import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserHelpersService } from '../../services/user-helpers.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any = {};

  profileEdit:FormGroup;

  constructor(private usersrv:UserHelpersService,formBuider:FormBuilder,private toast:ToastrService){

      this.profileEdit=new FormGroup({
       
        usersName:new FormControl('',[]),
        userMobNo:new FormControl('',[]),
        userEmailId:new FormControl('',[]),
        userGender:new FormControl('',[]),
        userDateOfBirth:new FormControl('',[]),
       
        
      })

  }

  ngOnInit(): void {
    
    this.usersrv.getUserPersonalInfoById(localStorage.getItem("userId")).subscribe({
     next: (data) => {
      this.user = data;
      this.profileEdit.patchValue(this.user); //show data in front end
      console.log(this.user);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


  editUserProfile(){
   console.log(this.profileEdit.value);

   this.usersrv.updateUserPersonalInfoById(this.profileEdit.value).subscribe({
    next: (data) => { 
           if(data!=null){
            console.log(data);
            
          }
          this.toast.success("Profile Updated Successfully", "Success")
        }  ,
        error: (err) => {
          console.log(err);
          this.toast.error("Profile Not Updated ", "Error")
         

          
          

          }
        
   })

  }

  
 

}
