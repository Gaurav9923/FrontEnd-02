import { DialogRef } from '@angular/cdk/dialog';
import { Component,OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AdminApiHelperService } from '../../services/admin-api-helper.service';

@Component({
  selector: 'app-set-screening-dialogue',
  templateUrl: './set-screening-dialogue.component.html',
  styleUrl: './set-screening-dialogue.component.css'
})
export class SetScreeningDialogueComponent  {
  selectedMovieItem: any;
  selectedMovieObjeToSet: any;
  selectedScreening:any;
  movieList:any;
    constructor(private toast:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminsrv:AdminApiHelperService,
    private dialogRef:DialogRef,
    ) { 
      console.log(data)
      this.selectedScreening= data.selectedScreening
      this.movieList=data.movieList

    }

    movieTOSetInAuditorium(){
      this.selectedMovieObjeToSet=this.movieList[this.selectedMovieItem]
      console.log(this.selectedMovieObjeToSet)

      this.setScreening(this.selectedMovieObjeToSet.movieId,this.selectedScreening.auditorumFk.auditoriumId,this.selectedScreening.screeningId)
      
    }

    

   

  
  setScreening(movieId: number, auditoriumId: number, screeningId: number): void {
    // console.log(movieId,auditoriumId,screeningId);
    this.adminsrv.setScreeningApi(movieId, auditoriumId, screeningId).subscribe(
      (data) => {
        // console.log(data)
        this.toast.success("Screening Set Successfully", "Success!")
        this.dialogRef.close();
       
        
      },
      (err) => {
        // console.log(data)
        this.toast.warning("Already Ongoing! Something went wrong", "Operation Incomplete!")   
        
        // this.dialogRef.close();
        console.log(err);

      }
    );
  }

  closeDialogue(){
    this.dialogRef.close();
  }

  

  

  

}
