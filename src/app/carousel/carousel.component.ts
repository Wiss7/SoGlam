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
  videos: string[] = [
    '../../assets/images/HomePage.mp4',
    '../../assets/images/Homepage2.mp4',
    '../../assets/images/Homepage3.mp4',
  ];
  constructor(
    config: NgbCarouselConfig,
    private sharedService: SharedService,
    public sanitizer: DomSanitizer
  ) {
    config.interval = 3000;
    config.keyboard = true;
    config.pauseOnHover = false;
  }
  ngOnInit() {}
}
