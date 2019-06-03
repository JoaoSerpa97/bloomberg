import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { ToastrService } from "ngx-toastr";
import {AppComponent} from '../app.component';
import {UserInfoService} from '../commservice/userinfoservice';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private cookie: CookieService,
    private toastr: ToastrService,
    private router: Router,
    private userinfoService: UserInfoService
  ) { }
  ngOnInit() {
  }
  login(username: string, password: string) {
    this.loginService.login(username,password).subscribe(token => {
      this.cookie.set("Authentication", token.token);
      this.userinfoService.ping()
      this.toastr.success(token.token, "Success!");
      this.router.navigateByUrl("");
    })
  }
}
