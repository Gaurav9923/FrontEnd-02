import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserHelpersService {

  constructor(private http: HttpClient,private router:Router){}

   getAllMovies():Observable<any>{
    return this.http.get(
      'http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/user/moviesList'
    );
   }
   getAllScrenning():Observable<any>{
    return this.http.get(
      'http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/user/screeningList'
    );
   }
  //  login(request: LoginRequest): Observable<LoginResponse> {
  //   return this.http.post<LoginResponse>(
  //     Constant.API_END_POINT + Constant.METHODS.LOGIN_USER,
  //     request
  //   );
  // }

    getScreeningById(auditorium_id:any):Observable<any>{
      return this.http.get(
        `http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/user/screening/${auditorium_id}`
        );
    }

    getMovieById(movieId:any):Observable<any>{
      return this.http.get(
        `http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/user/getMovie/${movieId}`
        );
    }

    searchMovie(searchString: string) {
     
      return this.http.get( `http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/user/moviesSearchList/${searchString}`);
    }

    cancelSeat(reservationId: any) {
     
      return this.http.delete( `http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/book/cancelBooking/${reservationId}`);
    }

    // http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/user/screeningList
    //`http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/book/bookedSeat/${auditoriumId}`
    //http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/admin/screening/1

    getReservedSeatNumberList(auditoriumId:number):Observable<any>{
     
      return this.http.post( `http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/book/bookedSeat/${auditoriumId}`,{});
    }

    // http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/user/fetch/7

    getUserPersonalInfoById(userId:any):Observable<any>{
     
      return this.http.get( `http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/user/fetch/${userId}`);
    }

    sendUserSignUpRequest(userObj:any):Observable<any>{
     
     
      return this.http.post("http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/auth/signUp",
      {
       usersName:userObj.usersname,
       userEmailId:userObj.email,
       userPassword:userObj.password 
       }
      )
    }
    
    updateUserPersonalInfoById(userObj:any):Observable<any>{
      console.log(userObj)
     // "http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/user/updateUser",
      return this.http.post( `http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/user/updateUser`,
      {  userId:localStorage.getItem('userId'),           
        usersName: userObj.usersName,
        userEmailId: userObj.userEmailId,
        userGender: userObj.userGender,
        userDateOfBirth: userObj.userDateOfBirth,
        userMobNo: userObj.userMobNo,
        userPassword: userObj.userPassword
        
       
      }
      );
    }
    

    
    
    setSelectSeatTOSeatTable(auditorium_id:number,selectedSeat:number[]):Observable<any>{
      
      return this.http.post( `http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/book/selectSeat/${auditorium_id}`,selectedSeat)
     
    }
    
    confirmSelectSeatTOSeatTable(userId:number,auditoriumId:number,selectedSeat:number[]):Observable<any>{
      
      return this.http.post( `http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/book/confirmSeats/${userId}/${auditoriumId}`, selectedSeat);
    }



    getReservationIdToPrintTicket():Observable<any>{
     
      return this.http.get( `http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/book/reservationId/${localStorage.getItem("userId")}`);
    }
    getPrintTicket(reservationId:any):Observable<any>{
     
      return this.http.get( `http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/book/printTicket/${reservationId}`);
    }



    reloadCurrent() {
      this.reloadComponent(true, '');
    }
  
    reloadComponent(self: boolean, urlToNavigateTo: string) {
      const url = self? this.router.url : urlToNavigateTo;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/' + url]).then(() => {
          console.log(`After navigation I am on: ${this.router.url}`);
        });
      });
    }
   
}
