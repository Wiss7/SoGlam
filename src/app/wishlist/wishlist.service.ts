import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { WishlistComponent } from './wishlist.component';
import { Wishlist } from './wishlist.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlist: Wishlist[];
  constructor(private firestore: AngularFirestore) {}

  getWishlist() {
    const userId = localStorage.getItem('userId') || '';
    return this.firestore
      .collection('Wishlist', (ref) => ref.where('userid', '==', userId))
      .snapshotChanges();
  }

  deleteWishlist(wishlistId: any) {
    return this.firestore.doc('Wishlist/' + wishlistId).delete();
  }

  addWishlist(wishlistItem: Wishlist) {
    return this.firestore
      .collection('Wishlist')
      .add(Object.assign({}, wishlistItem));
  }

  getWishlistItemByProductId(index: number) {
    return this.wishlist[index];
  }
}
