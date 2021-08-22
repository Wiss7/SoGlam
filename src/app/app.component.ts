import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Settings } from './home/settings.model';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  test: string = 'wiss';
  constructor(public sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.getUserCurrency();
    this.sharedService.getSettings();
  }
  title = 'So Glam';
}
