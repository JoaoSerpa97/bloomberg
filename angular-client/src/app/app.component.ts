import { Component } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {User} from './django_classes';
import {LoginService} from './services/login.service';
import {Router} from '@angular/router';
import {UserInfoService} from './commservice/userinfoservice';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserInfoService]
})
export class AppComponent {
  private user: User;
  constructor(
    private cookie: CookieService,
    private loginService: LoginService,
    private router: Router,
    private userInfoService: UserInfoService
  ) {
    this.getAuth();
    userInfoService.pingObs$.subscribe(() => {
      this.user = null;
      this.getAuth();
    })
  }
  title = 'ReviewLords';
  private getAuth() {
    if(this.cookie.get("Authentication")){
      this.loginService.user(this.cookie.get("Authentication")).subscribe(usr => {
        this.user = usr;
        this.userInfoService.setUser(usr);
      });
    }
    else{
      this.user = null;
    }
  }
  logout() {
    this.cookie.delete("Authentication");
    this.user = null;
    this.router.navigateByUrl("")
  }
  ownProfile() {
    this.router.navigateByUrl("user/" + this.user.user.id);
  }
}
