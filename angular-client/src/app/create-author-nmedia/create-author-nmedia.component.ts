import { Component, OnInit } from '@angular/core';
import {MediaService} from '../services/media.service';
import {MediaAuthorService} from '../services/media-author.service';
import {Media, MediaAuthor} from '../django_classes';
import { Location } from '@angular/common'

@Component({
  selector: 'app-create-author-nmedia',
  templateUrl: './create-author-nmedia.component.html',
  styleUrls: ['./create-author-nmedia.component.css']
})
export class CreateAuthorNMediaComponent implements OnInit {

  private list: any;
  private list2: any;
  private isAuthors: boolean;
  private isMedias: boolean;


  private authors: MediaAuthor[];
  private medias: Media[];
  private mediaToAdd: Media;
  private authorToAdd: MediaAuthor;

  constructor(
    private location: Location,
    private mediaService: MediaService,
    private mediaauthorService: MediaAuthorService,
  ) { }

  ngOnInit() {
    this.mediaToAdd = new Media();
    this.authorToAdd = new MediaAuthor();
    this.listAuthors();
    this.listMedias();
  }

  private listAuthors() {
    this.mediaauthorService.getAllMediaAuthors().subscribe(auth => this.authors = auth)
  }

  private listMedias() {
    this.mediaService.getMedias().subscribe(meds => this.medias = meds)
  }

  changeObjs(value: string) {
    if (value === "medias"){
      this.list = this.medias;
      this.isMedias = true;
      this.isAuthors = false;
    }
    else if (value === "authors"){
      this.list = this.authors;
      this.isMedias = false;
      this.isAuthors = true;
    }
  }

  justchatting(value: string) {
    if (value === "medias"){
      this.list2 = this.authors;
    }

  }

  eraseMedia(item: Media) {
    if(confirm('Are you sure you want to delete ' + item.name + '?')){
      this.mediaService.deleteMedia(item).subscribe(() => this.goBack());
    }
  }


  addMedia() {
    this.mediaService.addMedia(this.mediaToAdd).subscribe(() => alert('New media has been added!'));
  }

  addAuthor() {
    this.mediaauthorService.addMediaAuthors(this.authorToAdd).subscribe(() => alert('New author has been added!'));
  }

  editMedia(item: Media) {
    this.mediaService.updateItem(item).subscribe(() => this.goBack());
  }

  eraseAuthor(mediaauth: MediaAuthor) {
    if(confirm("Are you sure you want to delete " + mediaauth.name + "?")){
      this.mediaauthorService.deleteMediaAuthor(mediaauth).subscribe(() => this.goBack());
    }
  }

  editAuthor(mediaauth: MediaAuthor) {
    this.mediaauthorService.editMediaAuthor(mediaauth).subscribe(() => this.goBack());
  }

  private goBack() {
    this.location.back();
  }
}
