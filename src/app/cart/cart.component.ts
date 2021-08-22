import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared.service';
import { Product } from '../shop/product.model';
import { ProductService } from '../shop/product.service';
import { CartItem } from './cart.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  isLoading: Boolean = true;
  cartSubscription: Subscription;
  productSubscription: Subscription;
  CartItems: Product[] = [];
  products: Product[] = [];
  cart: CartItem[] = [];
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    public sharedService: SharedService
  ) {}
  ngOnInit() {
    this.cartService.getCartItemsList();
    this.cartSubscription = this.cartService.cartItemsChanged.subscribe(
      (cartItems) => {
        this.cart = cartItems;
        this.productSubscription = this.productService
          .getProductsList()
          .subscribe((data) => {
            this.products = data.map((e) => {
              return {
                ...(e.payload.doc.data() as Product),
                id: e.payload.doc.id,
              };
            });
            this.CartItems = this.products.filter((product) => {
              return (
                this.cart.filter((item) => {
                  return item.productID === product.id;
                }).length > 0
              );
            });
            this.isLoading = false;
          });
      }
    );
  }

  getImageUrl(index: number) {
    let imagePath: string = '../../../assets/images/products/';
    const defaultImg = this.products[index].images.filter(
      (prod) => prod.isDefault === true
    );
    if (defaultImg.length > 0) imagePath += defaultImg[0].name;
    else imagePath += this.products[index].images[0].name;
    return imagePath;
  }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
    if (this.cartSubscription) this.cartSubscription.unsubscribe();
  }
  deleteFromCart(productId: string) {
    const index = this.cart.findIndex((item) => {
      return item.productID === productId;
    });
    this.cartService.deleteFromCart(index);
  }
  getQuantity(productId: string) {
    const index = this.cart.findIndex((item) => {
      return item.productID === productId;
    });
    if (this.cart[index]) return this.cart[index].quantity;
    else return 0;
  }

  getSubtotal() {
    let subtotal: number = 0;
    this.CartItems.forEach((element) => {
      if (element.isOnSale)
        subtotal =
          +subtotal + +(element.discountPrice * this.getQuantity(element.id));
      else
        subtotal = +subtotal + +(element.price * this.getQuantity(element.id));
    });
    return subtotal;
  }

  updateQuantity(productId: string, qty: number) {
    const index = this.cart.findIndex((item) => {
      return item.productID === productId;
    });
    this.cartService.updateQtyFromCart(index, qty);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
