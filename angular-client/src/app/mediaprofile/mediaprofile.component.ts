import { Component, OnInit } from '@angular/core';
import {Media, Review, User} from '../django_classes';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {ReviewService} from '../services/review.service';
import {MediaService} from '../services/media.service';

@Component({
  selector: 'app-mediaprofile',
  templateUrl: './mediaprofile.component.html',
  styleUrls: ['./mediaprofile.component.css'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[style.width.%]': '0',
  },
})
export class MediaprofileComponent implements OnInit {

  private num: number;
  private currentMedia: Media;
  private reviews: Review[];
  private avg: number;
  private realavg: number;
  private fiveperc: number;
  private five: number;
  private fourperc: number;
  private four: number;
  private threeperc: number;
  private three: number;
  private twoperc: number;
  private two: number;
  private oneperc: number;
  private one: number;
  private rate: number;
  private review: Review;

  constructor(
    private route: ActivatedRoute,
    private roooote: Router,
    private mediaService: MediaService,
    private reviewService: ReviewService) { }

  ngOnInit() {
    this.review = new Review();
    this.avg = 0;
    this.five = this.four = this.three = this.two = this.one = 0;
    this.num = +this.route.snapshot.paramMap.get('num');
    this.getTheMedia();
    this.getTheReviews();
  }

  getTheMedia() {
    this.mediaService.getMediaId(this.num).subscribe(md => this.currentMedia = md);
  }


  getTheReviews() {
    this.reviewService.getReviewsByMedia(this.num).subscribe(revs => {

      if (!(revs == null)) {
        let i: number;
        let avg = 0;
        for (i = 0; i < revs.length; i++) {
          if (revs[i].rate === 5) {
            this.five += 1;
          } else if (revs[i].rate === 4) {
            this.four += 1;
          } else if (revs[i].rate === 3) {
            this.three += 1;
          } else if (revs[i].rate === 2) {
            this.two += 1;
          } else if (revs[i].rate === 1) {
            this.one += 1;
          }
          avg = avg + revs[i].rate;
        }
        this.realavg = avg / revs.length;
        this.avg = Math.ceil(this.realavg);
        this.fiveperc = (this.five / revs.length) * 100;
        this.fourperc = (this.four / revs.length) * 100;
        this.threeperc = (this.three / revs.length) * 100;
        this.twoperc = (this.two / revs.length) * 100;
        this.oneperc = (this.one / revs.length) * 100;
      }

      this.reviews = revs;
    });
  }

  addReview(item: Review) {
    item.media = this.currentMedia.id;
    item.author = 15;
    item.media_name = this.currentMedia.name;
    item.img = 'no-img';
    item.username = 'no username';

    this.reviewService.addReview(item).subscribe(() => this.roooote.navigateByUrl('') );
  }
}


