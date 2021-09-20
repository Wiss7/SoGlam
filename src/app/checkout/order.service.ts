import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from './order.model';
@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private firestore: AngularFirestore) {}
  placeOrder(order: Order) {
    return this.firestore.collection('Orders').add(Object.assign({}, order));
  }

  getOrders() {
    return this.firestore
      .collection('Orders', (ref) =>
        ref.where('userID', '==', localStorage.getItem('userId'))
      )
      .snapshotChanges();
  }
}
