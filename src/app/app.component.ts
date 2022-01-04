import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
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
  constructor(
    public sharedService: SharedService,
    private firebaseAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.sharedService.getSettings();
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.sharedService.isLoggedIn = true;
      } else {
        this.sharedService.isLoggedIn = false;
      }
    });
  }
  title = 'So Glam';
}
