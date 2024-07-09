import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserHelpersService } from '../../services/user-helpers.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class  MovieDetailsComponent implements OnInit {
  // movieObj: any;

  currentMovie:any;
  

    constructor(private router:ActivatedRoute,private usersrv:UserHelpersService,private toast:ToastrService) {}

    ngOnInit(): void {
      const routeParams = this.router.snapshot.paramMap;
      const movieId = Number(routeParams.get('movieId'));
   
      this.getMovieById(movieId);
   
     

      
    }
    getMovieById(movieId: any) {
      this.usersrv.getMovieById(movieId).subscribe(
        {
          next: (res) => {
           
            this.currentMovie = res;
            console.log(this.currentMovie)
          },
          error: (error) => {
            this.toast.error("Error while fetching screen " + error);
          }
        }
  
      );
    }

}
