import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Address } from './address.model';

@Injectable({ providedIn: 'root' })
export class AddressService {
  constructor(public firestore: AngularFirestore) {}

  AddNewAddress(info: Address) {
    return this.firestore.collection('Addresses').add(Object.assign({}, info));
  }

  updateAddress(newInfo: Address) {
    return this.firestore
      .doc('Addresses/' + newInfo.id)
      .update(Object.assign({}, newInfo));
  }

  getAddressList() {
    const userId = localStorage.getItem('userId') || '';
    return this.firestore
      .collection('Addresses', (ref) => ref.where('userID', '==', userId))
      .snapshotChanges();
  }

  deleteAddress(id: String) {
    return this.firestore.doc('Addresses/' + id).delete();
  }
  editAddress(addr: Address) {
    localStorage.setItem('editAddress', JSON.stringify(addr));
  }

  getAddress() {
    const addr = localStorage.getItem('editAddress');
    if (addr) return JSON.parse(addr);
  }
}
