import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminApiHelperService {
  constructor(private http: HttpClient,private router:Router) {}

  getAllMoviesList(): Observable<any> {
    return this.http.get(
      'http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/admin/moviesList'
    );
  }
  getAllUsersList(): Observable<any> {
    return this.http.get('http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/admin/fetchAll');
  }
  getAllAuditoriumList(): Observable<any> {
    return this.http.get(
      'http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/admin/auditoriumList'
    );
  }

  getAllScrenningList(): Observable<any> {
    return this.http.get(
      'http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/admin/screeningList'
    );
  }

  getSeatAvailibilityTicket(audId: any): Observable<any> {
    return this.http.get(
      `http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/admin/checkAvailableBooking/${audId}`
    );
  }
  addMovieDetailsApi(addMovieObj:any): Observable<any> {
    
    return this.http.post('http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/admin/addMovie', {
      movieName: addMovieObj.movieName,
      description: addMovieObj.description,
      genre: addMovieObj.genre,
      movieImage: addMovieObj.imageUrl,
    });
  }
  addAuditoriumApi(addAuditoriumObj:any): Observable<any> {
    
    return this.http.post('http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/admin/addAuditorium', {
      auditoriumName: addAuditoriumObj.auditoriumName,
      number_of_seat: addAuditoriumObj.auditoriumCapacity,
     
      
    });
  }
  setScreeningApi(movieId:any,auditId:any,screenId:any):Observable<any>{
      
    return this.http.post( `http://chitrapat-fronend.s3-website.eu-north-1.amazonaws.com/chitrapat/api/admin/setScreening?movieId=${movieId}&auditId=${auditId}&screeningId=${screenId}`,{});
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
