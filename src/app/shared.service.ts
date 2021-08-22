import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';
import { Settings } from './home/settings.model';
@Injectable({ providedIn: 'root' })
export class SharedService {
  settings: Settings[];
  user: User[];
  settingsSubscription: Subscription;
  userSubscription: Subscription;
  userCurrency: string = 'USD';
  isSettingsLoading: boolean = true;
  isCurrencyLoading: boolean = true;
  constructor(
    public firestore: AngularFirestore,
    public firebaseAuth: AngularFireAuth
  ) {}

  getSettings() {
    this.isSettingsLoading = true;
    this.settingsSubscription = this.firestore
      .collection('Settings')
      .snapshotChanges()
      .subscribe((data) => {
        this.settings = data.map((e) => {
          return {
            ...(e.payload.doc.data() as Settings),
            id: e.payload.doc.id,
          };
        });
        this.isSettingsLoading = false;
      });
  }
  getUserInfo() {
    const userId = localStorage.getItem('userId') || '';
    return this.firestore
      .collection('Users', (ref) => ref.where('userId', '==', userId))
      .snapshotChanges();
  }

  getUserCurrency() {
    if (!localStorage.getItem('userCurrency')) {
      localStorage.setItem('userCurrency', 'USD');
      this.userCurrency = 'USD';
    } else {
      this.userCurrency = localStorage.getItem('userCurrency') || 'USD';
    }
  }

  changeUserCurrency(currency: string) {
    localStorage.setItem('userCurrency', currency);
    this.userCurrency = currency;
  }

  ngOnDestroy() {}
}
