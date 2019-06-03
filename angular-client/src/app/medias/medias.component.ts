import { Component, OnInit } from '@angular/core';
import { Media } from '../django_classes';
import { MediaService } from '../services/media.service';

@Component({
  selector: 'app-movies',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css']
})
export class MediasComponent implements OnInit {
  medias: Media[];

  constructor(private mediaService: MediaService) { }

  ngOnInit() {
    this.getMedias();
  }

  getMedias(): void {
    this.mediaService.getMedias().subscribe(medias => this.medias = medias);
  }

  redefineMedias(searchParam: string) {
    this.mediaService.searchMedias(searchParam).subscribe(medias => this.medias = medias);
  }
}
