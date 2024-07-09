import { Component,OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { UserHelpersService } from '../../services/user-helpers.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css'
})


export class TicketDetailsComponent implements OnInit{

  reservarionObj:any;
  bookingArray:any;
  tickets:any=[];


  constructor(private usersrv:UserHelpersService,private toast:ToastrService){}

  ngOnInit(): void {
    this.getReservationObj();
    
   

   
  }
  


  getReservationObj(){
     this.usersrv.getReservationIdToPrintTicket().subscribe({
      next: (data) => {
        this.reservarionObj = data;
        console.log(this.reservarionObj);
        this.getBookingListArray();
        },
        error: (err) => {
          console.log(err);
          }

    });
  }

  getBookingListArray(){
    this.usersrv.getPrintTicket(this.reservarionObj?.reservationId).subscribe({
      next: (data) => {
        console.log(data);
        this.bookingArray = data;
        this.tickets = data;
        console.log(this.bookingArray);
        },
        error: (err) => {
          console.log(err);
        }
        
        
      })
      
      
    }
    cancelSeatBookingTicket(reservedSeatId: any){
    this.usersrv.cancelSeat(reservedSeatId).subscribe({
      next: (data) => {
     
      this.toast.success("Seat Canceled Succesfully!","SUCCESS");
      this.ngOnInit();
      
      
    },
    error: (err) => {
      console.log(err);
      this.toast.error("Seat Not Canceled!");
      }
        
        
      })
      
      
    }
    
    cancelSeatBooking(reservedSeatId: any){
      this.cancelSeatBookingTicket(reservedSeatId);
      console.log(reservedSeatId);


    }
    

    totalAmount:any=0;
    
    printTicket() {
      this.totalAmount= this.bookingArray.length*200;
    
      let content:any = document.getElementById('content');
      html2canvas(content, {
        scale: 4, // increase the scale to make the PDF more readable
        useCORS: true,
        logging: true
      }).then(canvas => {
        let doc = new jsPDF.jsPDF();
        let imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
        doc.save('ticket.pdf');
      });
  }
  
 
}
