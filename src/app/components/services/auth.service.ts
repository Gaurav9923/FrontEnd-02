import { Injectable } from '@angular/core';
import { AuthUser } from '../models/auth.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/login-response.model';
// import { Signup } from '../models/register.model';
import { LoginRequest } from '../models/login-request.model';
import { CookieService } from 'ngx-cookie-service';
import { Constant } from './constant/Constant';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // $user = new BehaviorSubject<any|undefined>(undefined);
  initialUser: AuthUser = {
    email: '',
    role: '',
  };  

  $userSubject = new BehaviorSubject<User | undefined>(this.initialUser);
  decodedToken: { [key: string]: string } | undefined;
  $role = new BehaviorSubject<string | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      Constant.API_END_POINT + Constant.METHODS.LOGIN_USER,
      request
    );
  }

  // register(request: Signup): Observable<string> {
  //   return this.http.post<string>(Constant.API_END_POINT + Constant.METHODS.REGISTER_USER, {
  //     name: request.name,
  //     email: request.email,
  //     password: request.password,

  //   });
  // }

  isLoggedIn() {
    var isExpired = false;
    const token = this.cookieService.get('Authorization');
    const jwtToken = token.slice(7, token.length - 1);

    if (jwtToken) {
      // console.log(jwtToken)
      const payload = atob(jwtToken.split('.')[1]);

      const parsedPayload = JSON.parse(payload); // convert payload into an Object

      isExpired = parsedPayload.exp > Date.now() / 1000; // check if token is expired
    }
    return isExpired;
  }


  decodeToken(token: any) {
    this.decodedToken = jwtDecode(token);
   

    this.initialUser.role = this.decodedToken
      ? this.decodedToken['ROLE']
      : undefined;

    // console.log( this.initialUser.role[0].authority)
    //   this.$userSubject.next(this.initialUser);

    this.$role.next(this.initialUser.role[0].authority);

    localStorage.setItem('role', this.initialUser.role[0].authority);
  }

  isAdmin() {
    if (localStorage.getItem('role') === 'ADMIN') {
      return true;
    }

    return false;
  }



  getUser(): any | undefined {
    const role = localStorage.getItem('role');
    //   console.log(role);
    if (role) {
      const user: AuthUser = {
        email: role,
        role: role,
      };

      return user;
    }

    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.initialUser.role = undefined;
    //   this.$userSubject.next(this.initialUser);
  }
}
