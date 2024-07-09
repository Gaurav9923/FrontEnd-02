import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserHelpersService } from '../../services/user-helpers.service';
import { TheaterScreenComponent } from '../theater-screen/theater-screen.component';

@Component({
  selector: 'app-book-movie',
  templateUrl: './book-movie.component.html',
  styleUrl: './book-movie.component.css'
})


export class BookMovieComponent  implements OnInit{
  currentScreen:any={};
  occupiedSeats: number[]=[];


  constructor(private router: ActivatedRoute, private dialog: MatDialog,private usersrv:UserHelpersService,private toast: ToastrService) { 
  }
  
  
  ngOnInit(): void {
    const routeParams = this.router.snapshot.paramMap;
    const auditoriumId = Number(routeParams.get('auditoriumId'));
    // console.log(auditoriumId)
    this.getScreenById(auditoriumId);  // used to get movie details to book 
    
    
    this.getBookedSeatList(auditoriumId);
  
   
   
    
  }

  openDialogue(){
    this.dialog.open(TheaterScreenComponent,{
    
      width:"30%",
      height:"auto",
      data: { screenObj: this.currentScreen,bookedSeatArray:this.occupiedSeats },
      
      
    })
  }


  getScreenById(auditoriumId: any) {
    this.usersrv.getScreeningById(auditoriumId).subscribe(
      {
        next: (res) => {
          // console.log(res)
          this.currentScreen = res;
          console.log(this.currentScreen)
        },
        error: (error) => {
          this.toast.error("Error while fetching movie " + error);
        }
      }

    );

  }

  getBookedSeatList(auditoriumId: number) {
    this.usersrv.getReservedSeatNumberList(auditoriumId).subscribe({
      next: (response) => {
       
        if (response != null) {
          console.log('getReservedSeatNumberList=>', response);      
          this.occupiedSeats=response;
          // console.log(this.occupiedSeats)
          
        }
      
      },
    });
  }


 
}
