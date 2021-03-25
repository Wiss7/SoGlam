import { Subject } from 'rxjs';
import { CartItem } from './cart.model';

export class CartService {
  cartItems: CartItem[] = [];
  cartItemsChanged = new Subject<CartItem[]>();

  getCartItemsList() {
    return this.cartItems.slice();
  }

  getCartItemsListCount() {
    return this.cartItems.length;
  }

  getCartItem(index: number) {
    return this.cartItems[index];
  }

  addToCart(productId: string, qty: number) {
    const index = this.cartItems.findIndex((item) => {
      return item.productID === productId;
    });
    if (index > -1) {
      this.updateQuantity(index, qty);
      return;
    }
    this.cartItems.push(new CartItem(qty, 'cookie', productId));
    this.cartItemsChanged.next(this.cartItems.slice());
  }

  updateQuantity(index: number, qty: number) {
    this.cartItems[index].quantity += +qty;
    this.cartItemsChanged.next(this.cartItems.slice());
  }

  deleteFromCart(index: number) {
    this.cartItems.splice(index, 1);
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
