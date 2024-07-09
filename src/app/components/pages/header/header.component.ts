import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  searchString:string="";
//,private authsrv:AuthService
  constructor(private dialogue:MatDialog,public authsrv:AuthService,private router:Router,private toast:ToastrService){

  }
  ngOnInit() {  
    console.log("islogedIn=>",this.authsrv.isLoggedIn())  
    console.log("isadmin=>",this.authsrv.isAdmin())  
  }
  openDialogue(){
    this.dialogue.open(LoginComponent,{
    
      width:"auto",
      height:"auto",
      
      
    })
  }

  signOut(){
    console.log("this.signOut clicked");
     this.authsrv.logout();
     this.toast.success("You are logged out successfully","Success");
      this.router.navigate(['']);

  }

  searchProducts(){
    console.log(this.searchString)
    this.router.navigate([`/search/movie/${this.searchString}`]);
    
  }
}
