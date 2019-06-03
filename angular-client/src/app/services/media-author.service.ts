import { Injectable } from '@angular/core';
import {Media, MediaAuthor, User} from '../django_classes';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {paths} from '../const';
import {CookieService} from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type:': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class MediaAuthorService {

  constructor(private http: HttpClient,
              private cookie: CookieService, ) { }

  authHeader = {
    headers: new HttpHeaders({Authorization: 'token ' + this.cookie.get('Authentication') })
  };

  // Gets SHOULD WORK :o
  getAllMediaAuthors(): Observable<MediaAuthor[]> {
    const url = paths.baseUrl + 'allmediaauthors';
    this.authHeader = {
      headers: new HttpHeaders({Authorization: 'token ' + this.cookie.get('Authentication') })
    };
    return this.http.get<MediaAuthor[]>(url, this.authHeader);
  }

// Gets SHOULD WORK :o
  getMediaAuthorByID(id: number): Observable<MediaAuthor> {
    const url = paths.baseUrl + 'mediaauthors?id=' + id;
    this.authHeader = {
      headers: new HttpHeaders({Authorization: 'token ' + this.cookie.get('Authentication') })
    };
    return this.http.get<MediaAuthor>(url, this.authHeader);
  }

  addMediaAuthors(meda: MediaAuthor): Observable<any> {
    this.authHeader = {
      headers: new HttpHeaders({Authorization: 'token ' + this.cookie.get('Authentication')})
    };
    const url = paths.baseUrl + 'addmediaauthors';
    return this.http.post(url, meda, this.authHeader);
  }

  deleteMediaAuthor(med: MediaAuthor): Observable<any> {
    const url = paths.baseUrl + 'removemediaauthors/' + med.id;
    this.authHeader = {
      headers: new HttpHeaders({Authorization: 'token ' + this.cookie.get('Authentication') })
    };
    return this.http.delete<MediaAuthor>(url, this.authHeader);
  }

  editMediaAuthor(mediaauth: MediaAuthor): Observable<any> {
    const url = paths.baseUrl + 'editmediaauthor?id=' + mediaauth.id;
    delete mediaauth.img;
    return this.http.put<Media>(url, mediaauth, {
      headers: new HttpHeaders().set('Authorization', 'token  ' + this.cookie.get('Authentication'))
        .set('Content-Type', 'application/json')
    });
  }
}
