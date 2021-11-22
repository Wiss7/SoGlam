import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from '../checkout/order.model';
import { SharedService } from '../shared.service';
import { Product } from '../shop/product.model';
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
    discountPct: number,
    images: string,
    lebanonShippingFee: number,
    shippingRateCurrency: number,
    headerText: string
  ) {
    this.sharedService.settings[0].currencyRate = currencyRate;
    this.sharedService.settings[0].discountFirstOrder = discountFirstOrder;
    this.sharedService.settings[0].discountPct = discountPct;
    this.sharedService.settings[0].images = images;
    this.sharedService.settings[0].lebanonShippingFee = lebanonShippingFee;
    this.sharedService.settings[0].shippingRateCurrency = shippingRateCurrency;
    this.sharedService.settings[0].headerText = headerText;
    return this.firestore
      .doc('Settings/' + this.sharedService.settings[0].id)
      .update(this.sharedService.settings[0]);
  }

  getOrders() {
    return this.firestore.collection('Orders').snapshotChanges();
  }

  deleteOrder(id: string) {
    return this.firestore.doc('Orders/' + id).delete();
  }

  updateStatus(order: Order) {
    return this.firestore
      .doc('Orders/' + order.id)
      .update({ status: order.status });
  }

  updateProduct(product: Product) {
    return this.firestore
      .doc('Products/' + product.id)
      .update(Object.assign({}, product));
  }

  addProduct(product: Product) {
    return this.firestore
      .collection('Products')
      .add(Object.assign({}, product));
  }

  deleteProduct(id: string) {
    return this.firestore.doc('Products/' + id).delete();
  }
}
