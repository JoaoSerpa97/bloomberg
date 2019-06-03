import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AuthToken, User, UserSpecs} from '../django_classes';
import {HttpClient} from '@angular/common/http';
import {paths} from '../const';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<AuthToken> {
    const url = paths.baseUrl + 'login';

    const body = {
      'username': username,
      'password': password
    };

    return this.http.post<AuthToken>(url, body);
  }

  user(token: string): Observable<User> {
    const url = paths.baseUrl + 'getusername?token=' + token;

    return this.http.get<User>(url)
  }

}
