import { Injectable } from '@angular/core';
import {Media, User, UserRegister} from '../django_classes';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {paths} from '../const';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type:': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpAuth = {};

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) {
    this.httpAuth = {
      headers: new HttpHeaders({Authentication: 'token ' + cookie.get("Authentication")})
    };
  }
  getUserId(id: number): Observable<User> {
    const url = paths.baseUrl + 'user?id=' + id;
    return this.http.get<User>(url);
  }
  // Registers a user, its needs a password and username
  addUser(usr: UserRegister): Observable<any> {
    const url = paths.baseUrl + 'register';
    return this.http.post(url, usr, httpOptions);
  }
  // Problem IT ASKS FOR USERNAME AND PASSWORD... OH NO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
  // THERE IS A DIFFERENT ENDPOINT TOO editusernotadmin?id= que recebe o id sem ser admin.... (pede também a pass)
  editUser(currentUser: User): Observable<any>{
    const url = paths.baseUrl + 'edituser?id=' + currentUser.admin.id;

    delete currentUser.user.img;

    return this.http.put<Media>(url, currentUser, {
      headers: new HttpHeaders().set('Authorization', 'token  ' + this.cookie.get('Authentication'))
        .set('Content-Type', 'application/json')
    });
  }
}
