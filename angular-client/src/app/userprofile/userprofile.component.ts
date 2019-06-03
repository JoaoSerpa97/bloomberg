import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';
import {ReviewService} from '../services/review.service';
import {Review, User} from '../django_classes';
import {UserInfoService} from '../commservice/userinfoservice';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  num;
  currentUser: User;
  loginUser: User;
  reviews: Review[];
  sameUser: boolean;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private reviewService: ReviewService,
    private userInfoService: UserInfoService

  ) {
    userInfoService.userObs$.subscribe(user => {
      this.loginUser = user;
      this.getTheUser();
    })
  }

  ngOnInit() {
    this.getTheUser();
  }

  getTheUser(): void {
    this.num = +this.route.snapshot.paramMap.get('num');
    this.userService.getUserId(this.num).subscribe(usr => {
      this.currentUser = usr;
      if (this.currentUser.user.id == this.loginUser.user.id){
        this.sameUser = true;
      }
    });
    this.getReviewsByUser();
  }

  private getReviewsByUser() {
    this.reviewService.getReviewsByUsrID(this.num).subscribe(revs => this.reviews = revs);
  }

  private editUser() {
    this.userService.editUser(this.currentUser).subscribe(() => this.goBack());
  }


  private goBack() {
    return undefined;
  }
}
