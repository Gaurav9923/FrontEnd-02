import { Component,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserHelpersService } from '../../services/user-helpers.service';

@Component({
  selector: 'app-confirm-book-dialogue',
  templateUrl: './confirm-book-dialogue.component.html',
  styleUrl: './confirm-book-dialogue.component.css'
})
export class ConfirmBookDialogueComponent {
 userId:any;
 flag:boolean=false;
  constructor(private dialogue:MatDialog,
          public dialogRef: MatDialogRef<ConfirmBookDialogueComponent>,
          @Inject(MAT_DIALOG_DATA) public data: any,
          private usersrv:UserHelpersService,
          private toast:ToastrService
    ){
      // console.log(this.data)  
      
    }

    doTask1(){
    
      
      this.usersrv.setSelectSeatTOSeatTable(this.data.auditoriumId,this.data.seatSelectedArray).subscribe({
        
        next: (response) => {
          
            console.log("this.doTask1() completed")
            this.doTask2();       
          
         
          },
         
          error: (err) => {

            if(err.status!==200 &&err.status!==406 ){
             
  
              console.log(err); 
              console.log(err.status)
              this.toast.error('Operation failed',"Operation not completed")
            }
          }
            
      })
    }
    doTask2(){    
      this.usersrv.confirmSelectSeatTOSeatTable(this.userId,this.data.auditoriumId,this.data.seatSelectedArray).subscribe({
        next: (res) => {
          console.log(res);
          this.toast.success('Success','Seat Booked Successfully')
          this.dialogRef.close();
          this.usersrv.reloadCurrent();
          
        },
        error: (err) => {
          console.log(err); 
          this.toast.error('Error','Seat Booking Failed')
          this.dialogRef.close();
        }
            
      })
    }


    confirmBooking() {
      this.userId=localStorage.getItem("userId");
      this.doTask1();

      // if(this.flag==true){
      //   this.doTask2();
      // }else{
      //   this.flag=false;
      //   this.toast.warning('Operation Incomplete',"Operation not completed")
      // }
    
    }

  closeDialog() {
    // implement your close dialog method here
    this.dialogRef.close();

  }
}
