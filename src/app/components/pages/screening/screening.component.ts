import { Component, OnInit } from '@angular/core';
import { UserHelpersService } from '../../services/user-helpers.service';

@Component({
  selector: 'app-screening',
  templateUrl: './screening.component.html',
  styleUrl: './screening.component.css'
})

export class ScreeningComponent implements OnInit {

  screeningList:any;

  constructor(private usersrv:UserHelpersService) {
    this.screeningList=[];
   }
  ngOnInit(): void {
  

    this.usersrv.getAllScrenning().subscribe({
      next:(response)=>{
              if(response!=null){
              console.log(response)
              this.screeningList=response;
              console.log(this.screeningList)
              
              }
      }
        

    })
    
  }

}
