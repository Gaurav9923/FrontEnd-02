import { Component, OnInit } from '@angular/core';
import { UserHelpersService } from '../../services/user-helpers.service';


@Component({
  selector: 'app-upcoming-movies',
  templateUrl: './upcoming-movies.component.html',
  styleUrl: './upcoming-movies.component.css'
})
export class UpcomingMoviesComponent implements OnInit {
  upcomingList:any;

  constructor(private usersrv:UserHelpersService) {
    this.upcomingList=[];
   }
  ngOnInit(): void {
    

    this.usersrv.getAllMovies().subscribe({
      next:(response)=>{
              if(response!=null){
              console.log("upcoming-->",response)
              this.upcomingList=response;
              
              
              }
      }
        

    })

   
  }
}
