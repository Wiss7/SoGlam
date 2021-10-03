import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from '../shared.service';
@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(
    public firestore: AngularFirestore,
    public sharedService: SharedService
  ) {}
  getMessages() {
    return this.firestore.collection('Messages').snapshotChanges();
  }

  deleteMessage(id: string) {
    return this.firestore.doc('Messages/' + id).delete();
  }

  updateSettings(
    currencyRate: number,
    discountFirstOrder: number,
    discountPct: number
  ) {
    this.sharedService.settings[0].currencyRate = currencyRate;
    this.sharedService.settings[0].discountFirstOrder = discountFirstOrder;
    this.sharedService.settings[0].discountPct = discountPct;
    return this.firestore
      .doc('Settings/' + this.sharedService.settings[0].id)
      .update(this.sharedService.settings[0]);
  }
}
