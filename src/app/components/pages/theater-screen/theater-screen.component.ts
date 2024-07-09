import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserHelpersService } from '../../services/user-helpers.service';
import { ConfirmBookDialogueComponent } from '../confirm-book-dialogue/confirm-book-dialogue.component';

@Component({
  selector: 'app-theater-screen',
  templateUrl: './theater-screen.component.html',
  styleUrl: './theater-screen.component.css',
})
export class TheaterScreenComponent implements OnInit {
  //seats=Array.from({ length: 8 * 8 }, (_, i) => i+1);
  rows: any = 8;
  cols: any = 8;
  seats: any[] = [];
  seatNumber: number = 1;
  occupiedSeats: number[]=[];
  seatSelected: number[] = [];
  //  seats=Array.from({ length: 8 * 8 }, (_, i) => i+1);

  constructor(
    
    @Inject(MAT_DIALOG_DATA) public data: any,private usersrv: UserHelpersService,
    private router: ActivatedRoute,
    private dialog: MatDialog
    ) { 

     
     }
  
  ngOnInit(): void {
    
    // console.log('-->', this.data);
    // console.log('-->', this.data.screenObj);
    // console.log('-->', this.data.bookedSeatArray);
    this.occupiedSeats= this.data.bookedSeatArray;
    
    //get auditorium id api
    this.createSeats();
      
        
  }

  // getBookedSeatList(auditoriumId: number) {
  //   this.usersrv.getReservedSeatNumberList(auditoriumId).subscribe({
  //     next: (response) => {
       
  //       if (response != null) {
  //         console.log('getReservedSeatNumberList=>', response);      

      
  //         // this.occupiedSeats = response;
  //         this.occupiedSeats=response.reduce((accumulator: number[], currentValue: number) => {
  //           accumulator.push(currentValue);
  //           return accumulator;
  //       }, this.occupiedSeats);
          
  //         console.log(this.occupiedSeats);
         
          
  //       }
      
  //     },
  //   });
  // }

  createSeats() {
    for (let i = 0; i < 8; i++) {
      this.seats[i] = [];
      for (let j = 0; j < 8; j++) {
        let occupied = this.occupiedSeats.includes(this.seatNumber);
        this.seats[i].push({
          number: this.seatNumber++,
          selected: false,
          occupied: occupied,
        });
      }
    }
  }

  toggleSeat(i: number, j: number) {
    let seat = this.seats[i][j];

    if (!seat.occupied) {
      seat.selected = !seat.selected;
      if (seat.selected) {
        this.seatSelected.push(seat.number);
      } else {
        const index = this.seatSelected.indexOf(seat.number);
        if (index > -1) {
          this.seatSelected.splice(index, 1);
        }
      }
    }

    console.log(this.seatSelected);
  }
  // movie={moviesObj} movie obj
  // selectedSeats={selectedSeats} array
  // onSelectedSeatsChange={(selectedSeats) => setSelectedSeats(selectedSeats)} new aaded seat array

  selectedSeats = [];
  //  handleSelectedState(seat) {

  //   const isSelected = this.selectedSeats.includes(seat)
  // if (isSelected) {
  //     onSelectedSeatsChange(
  //         this.selectedSeats.filter(selectedSeat => selectedSeat !== seat),
  //     )
  // } else {
  //    onSelectedSeatsChange([...selectedSeats, seat])
  // }
  // }
  openConfirmationDialogue() {

    this.dialog.open(ConfirmBookDialogueComponent,{
    
      width:"auto",
      height:"auto",
      data: { seatSelectedArray: this.seatSelected ,auditoriumId:this.data.screenObj.auditorumFk.auditoriumId},
      
      
      
    })
  }
}
