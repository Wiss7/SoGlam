import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  images: string[] = [];
  constructor(
    config: NgbCarouselConfig,
    private sharedService: SharedService,
    public sanitizer: DomSanitizer
  ) {
    config.interval = 2000;
    config.keyboard = true;
    config.pauseOnHover = true;
  }
  ngOnInit() {
    this.images = this.sharedService.settings[0].images.split(',');
  }
}
