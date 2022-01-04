import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { User } from './auth/user.model';
import { Settings } from './home/settings.model';
@Injectable({ providedIn: 'root' })
export class SharedService {
  settings: Settings[];
  user: User[];
  settingsSubscription: Subscription;
  userSubscription: Subscription;
  userCurrency: string = 'USD';
  currencyRate: number = 1;
  currencyShippingRate: number = 1;
  isSettingsLoading: boolean = true;
  isCurrencyLoading: boolean = true;
  isLoggedIn: boolean = false;
  isDiscountShown: boolean = false;
  currencyChanged = new Subject();
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
        this.getUserCurrency();
        this.isSettingsLoading = false;
      });
  }

  getUserCurrency() {
    if (!localStorage.getItem('userCurrency')) {
      localStorage.setItem('userCurrency', 'USD');
      this.userCurrency = 'USD';
      this.currencyRate = 1;
      this.currencyShippingRate = 1;
    } else {
      this.userCurrency = localStorage.getItem('userCurrency') || 'USD';
      if (this.userCurrency === 'USD') {
        this.currencyRate = 1;
        this.currencyShippingRate = 1;
      } else {
        this.currencyRate = this.settings[0].currencyRate;
        this.currencyShippingRate = this.settings[0].shippingRateCurrency;
      }
    }
  }

  changeUserCurrency(currency: string) {
    localStorage.setItem('userCurrency', currency);
    this.userCurrency = currency;
    if (this.userCurrency === 'USD') {
      this.currencyRate = 1;
      this.currencyShippingRate = 1;
    } else {
      this.currencyRate = this.settings[0].currencyRate;
      this.currencyShippingRate = this.settings[0].shippingRateCurrency;
    }
    this.currencyChanged.next();
  }
}
