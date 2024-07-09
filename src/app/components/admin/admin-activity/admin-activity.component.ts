import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SetScreeningDialogueComponent } from '../set-screening-dialogue/set-screening-dialogue.component';
import { AdminApiHelperService } from '../../services/admin-api-helper.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-admin-activity',
  templateUrl: './admin-activity.component.html',
  styleUrl: './admin-activity.component.css'
})
export class AdminActivityComponent implements OnInit {
  activeForm: string = 'none';
  usersList: any[] = [];
  movieList: any[] = [];
  auditoriumList: any[] = [];
  screeningList: any[] = [];
  availMap: any={Capacity:'NA', audId: 'NA', available: 'NA', Booked: 'NA'};
  
  addMovieForm:FormGroup;
 

  addAuditoriumForm:FormGroup
 
  selectedScreening: any;
  selectedMovieName: string = '';
  selectedAuditoriumToScreen: any;

  constructor(
    private adminsrv:AdminApiHelperService,
    private toastr: ToastrService,
    public dialog: MatDialog,

    
    
  ) {
  
    // movie form
    this.addMovieForm=new FormGroup({
      
      movieName:new FormControl('',[]),
      description:new FormControl('',[]),
      genre:new FormControl('',[]),
      imageUrl:new FormControl('',[]),
      
    })
    // auditorium form
    this.addAuditoriumForm=new FormGroup({
      
      auditoriumName:new FormControl('',[]),
      auditoriumCapacity:new FormControl('',[]),
      
      
    })
  
  
  }

  ngOnInit(): void {
    this.getUsersList();
    this.getMovieList();
    this.getAuditoriumList();
    this.getScreeningList();
    console.log(this.auditoriumList)
  }

  handleFormSwitch(formName: string): void {
    this.activeForm = formName;
    this.ngOnInit();
  }

  getUsersList(): void {
    this.adminsrv.getAllUsersList().subscribe(
      (data) => {
        this.usersList = data;
        console.log(this.usersList)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getMovieList(): void {
    this.adminsrv.getAllMoviesList().subscribe(
      (data) => {
        this.movieList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAuditoriumList(): void {
    this.adminsrv.getAllAuditoriumList().subscribe(
      (data) => {
        this.auditoriumList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getScreeningList(): void {
    this.adminsrv.getAllScrenningList().subscribe(
      (data) => {
        this.screeningList = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getSeatAvailMap(auditoriumId: number): void {
    this.adminsrv.getSeatAvailibilityTicket(auditoriumId).subscribe(
      (data) => {
        this.availMap = data;
        console.log('availMap-->', this.availMap);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addMovie(): void {
    console.log(this.addMovieForm.value)
    this.adminsrv.addMovieDetailsApi(this.addMovieForm.value).subscribe(
      (data) => {
        this.handleSuccessToast('Movie');
        this.addMovieForm.reset();
      },
      (err) => {
        this.handleFailedToast('Movie');
        console.log(err);
      }
    );
  }




  handleSuccessToast(successTarget: string): void {
    this.toastr.success(`${successTarget} added successfully!`);
  }

  handleWarnToast(warnTarget: string): void {
    this.toastr.warning(`${warnTarget} operation not complete!`);
  }

  handleFailedToast(failTarget: string): void {
    this.toastr.error(`${failTarget} - Operation not successfully!`);
  }

  handleInfoToast(info: string): void {
    this.toastr.info(`${info} !`);
  }

  addAuditorium(): void {
   
      this.adminsrv.addAuditoriumApi(this.addAuditoriumForm.value).subscribe(
        (data) => {
          this.handleSuccessToast('Auditorium');
        },
        (err) => {
          this.handleFailedToast('Auditorium');
          console.log(err);
        }
      );
   
  }

 

  handleUserList(desg: string): void {
    console.log('clicked to see list:', desg);
  }

  handleSeatAvailibilityList(auditoriumId: number): void {
    this.getSeatAvailMap(auditoriumId);
    console.log(this.availMap);
  }


// set screening dialgue box
  handleClickOpen(screening: any): void {
  console.log(screening);
    this.dialog.open(SetScreeningDialogueComponent,{
      height:'auto',
      width: 'auto',
      
      data: { selectedScreening: screening ,movieList: this.movieList},
      

    })

  }


  }



