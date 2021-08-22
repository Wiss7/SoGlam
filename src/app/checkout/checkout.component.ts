import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Address } from '../account/address/address.model';
import { AddressService } from '../account/address/address.service';
import { CartItem } from '../cart/cart.model';
import { CartService } from '../cart/cart.service';
import { SharedService } from '../shared.service';
import { Product } from '../shop/product.model';
import { ProductService } from '../shop/product.service';
import { Order } from './order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  isLoading: Boolean = true;
  cartSubscription: Subscription;
  productSubscription: Subscription;
  CartItems: Product[] = [];
  products: Product[] = [];
  cart: CartItem[] = [];
  payment: string = 'Cash on Delivery';
  addressSubscription: Subscription;
  addresslist: Address[] = [];
  address: string;
  isAddressEmpty: boolean = false;
  order: Order;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private addressService: AddressService,
    private router: Router,
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

            this.addressSubscription = this.addressService
              .getAddressList()
              .subscribe((data) => {
                this.addresslist = data.map((e) => {
                  return {
                    ...(e.payload.doc.data() as Address),
                    id: e.payload.doc.id,
                  };
                });
                this.isLoading = false;
              });
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

  getDiscount() {
    return 5;
  }

  getShippingFee() {
    return 2;
  }

  getGrandTotal() {
    let grandTotal: number = 0;
    grandTotal =
      this.getSubtotal() - this.getDiscount() + this.getShippingFee();

    return grandTotal;
  }

  placeOrder() {
    if (this.address && this.address.length > 0) {
      this.isAddressEmpty = false;
      // this.order = new Order(this.address,localStorage.getItem('userId') || '','Pending',Date.now,)
    } else this.isAddressEmpty = true;
  }
}
