import { Injectable } from '@angular/core';
import { Media } from '../django_classes';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {paths} from '../const';
import {CookieService} from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type:': 'application/json'}
  )
};


@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient,
              private cookie: CookieService,) { }

  authHeader = {
    headers: new HttpHeaders({Authorization: 'token ' + this.cookie.get('Authentication'),
      'Content-Type:': 'application/json' })
  };

  // Gets
  getMediaId(id: number): Observable<Media> {
    const url = paths.baseUrl + 'media?id=' + id;
    return this.http.get<Media>(url);
  }

  getMedias(): Observable<Media[]> {
    const url = paths.baseUrl + 'allmedia';
    return this.http.get<Media[]>(url);
  }

  searchMedias(searchParam: string): Observable<Media[]> {
    const url = paths.baseUrl + 'searchmedia?name=' + searchParam;
    return this.http.get<Media[]>(url);
  }

  addMedia(med: Media): Observable<any> {

    this.authHeader = {
      headers: new HttpHeaders({Authorization: 'token ' + this.cookie.get('Authentication')})
    };
    delete med.img;
    const url = paths.baseUrl + 'addmedia';
    return this.http.post(url, med, this.authHeader);
  }

  deleteMedia(med: Media): Observable<any> {
    this.authHeader = {
      headers: new HttpHeaders({Authorization: 'token ' + this.cookie.get('Authentication')})
    };
    const url = paths.baseUrl + 'removemedia/' + med.name;
    return this.http.delete<Media>(url, this.authHeader);
  }

  updateItem(med: Media): Observable<any> {
    const url = paths.baseUrl + 'editmedia?id=' + med.id;

    delete med.img;

    return this.http.put<Media>(url, med, {
      headers: new HttpHeaders().set('Authorization', 'token  ' + this.cookie.get('Authentication'))
        .set('Content-Type', 'application/json')
    });
  }
}
