import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { throwError, Observable, BehaviorSubject, of } from "rxjs";
import {catchError, filter, take, switchMap, finalize} from "rxjs/operators";
import { paths } from "../const";
import {Location} from '@angular/common';

import { ToastrService } from "ngx-toastr";
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private location: Location,
    private route: Router,
    private toastr: ToastrService,
    private cookie: CookieService
  ) { }


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (!req.url.includes(paths.auth)) {
      return next.handle(req);
    }
    console.warn("AuthInterceptor");

    if (!req.headers.has("Content-Type")) {
      req = req.clone({
        headers: req.headers.set("Content-Type", "application/json")
      });
    }


    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          //401 Unauthorized, we have to redirect the user to the login for a fresh new token!

          this.toastr.error(error.message, "Not Authorized!");
          this.cookie.delete("Authorization");
          this.route.navigateByUrl("login");

        } else {
          return throwError(error);
        }
      })
    );
  }
}
