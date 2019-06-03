import { Injectable } from '@angular/core';
import {Review, User} from '../django_classes';

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
export class ReviewService {

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  authHeader = {
    headers: new HttpHeaders({Authorization: 'token ' + this.cookie.get('Authentication') })
  };

  getReviewsByMedia(num: number): Observable<Review[]> {
    const url = paths.baseUrl + 'mediareviews?id=' + num;
    return this.http.get<Review[]>(url);
  }

  getReviewsByUsrID(num: number): Observable<Review[]>{
    const url = paths.baseUrl + 'userreviews?id=' + num;
    return this.http.get<Review[]>(url);
  }

  addReview(rev: Review): Observable<any> {
    const url = paths.baseUrl + 'addreview';
    this.authHeader = {
      headers: new HttpHeaders({Authorization: 'token ' + this.cookie.get('Authentication') })
    };
    return this.http.post(url, rev, this.authHeader);
  }

}
