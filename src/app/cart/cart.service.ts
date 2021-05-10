import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { CartItem } from './cart.model';
@Injectable()
export class CartService implements OnDestroy {
  cartItems: CartItem[] = [];
  cartItemsChanged = new Subject<CartItem[]>();
  subscription: Subscription;
  constructor(
    private firestore: AngularFirestore,
    private firebaseAuth: AngularFireAuth
  ) {
    this.getCartItemsList();
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  addToCartAfterSignIn() {
    alert('Hi');
  }
  getCartItemsList() {
    this.firebaseAuth.onAuthStateChanged((user) => {
      if (user && user.emailVerified) {
        this.subscription = this.firestore
          .collection('Cart', (ref) => ref.where('userID', '==', user.uid))
          .snapshotChanges()
          .subscribe((data) => {
            this.cartItems = data.map((e) => {
              return {
                ...(e.payload.doc.data() as CartItem),
                id: e.payload.doc.id,
              };
            });
            this.cartItemsChanged.next(this.cartItems.slice());
            const storageItems: CartItem[] = JSON.parse(
              localStorage.getItem('cart') || '[]'
            );
            if (storageItems.length > 0) {
              storageItems.forEach((element) => {
                this.addToCartDB(element.productID, element.quantity);
              });
              localStorage.removeItem('cart');
            }
          });
      } else {
        if (this.subscription) this.subscription.unsubscribe();
        this.cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        this.cartItemsChanged.next(this.cartItems.slice());
      }
    });
  }

  getCartItemsListCount() {
    return this.cartItems.length;
  }
  getCartItem(index: number) {
    return this.cartItems[index];
  }

  addToCartDB(productId: string, qty: number) {
    const index = this.cartItems.findIndex((item) => {
      return item.productID === productId;
    });
    if (index > -1) {
      var id = this.cartItems[index].id || '';
      return this.updateQuantityDB(id, index, qty);
    }
    const userId = localStorage.getItem('userId') || '';

    return this.firestore
      .collection('Cart')
      .add(Object.assign({}, new CartItem(qty, userId, productId, '')))
      .then((res) => {
        this.cartItemsChanged.next(this.cartItems.slice());
      });
  }

  addToCartStorage(productId: string, qty: number) {
    const index = this.cartItems.findIndex((item) => {
      return item.productID === productId;
    });
    if (index > -1) {
      this.updateQuantity(index, qty);
    } else {
      this.cartItems.push(new CartItem(qty, 'cookie', productId, ''));
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartItemsChanged.next(this.cartItems.slice());
  }
  updateQuantityDB(id: string, index: number, qty: number) {
    this.cartItems[index].quantity = +this.cartItems[index].quantity + +qty;
    return this.firestore
      .doc('Cart/' + this.cartItems[index].id)
      .update(this.cartItems[index])
      .then((res) => {
        this.cartItemsChanged.next(this.cartItems.slice());
      });
  }
  updateQuantity(index: number, qty: number) {
    this.cartItems[index].quantity = +this.cartItems[index].quantity + +qty;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartItemsChanged.next(this.cartItems.slice());
  }

  deleteFromCart(index: number) {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartItemsChanged.next(this.cartItems.slice());
  }

  updateCount() {
    this.cartItems = [];
    this.cartItemsChanged.next(this.cartItems.slice());
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsChanged.next(this.cartItems.slice());
  }
}
