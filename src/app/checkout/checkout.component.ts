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
import { OrderService } from './order.service';
import { DomSanitizer } from '@angular/platform-browser';
import { shippingRates } from './shipping-rates';
@Component({
  selector: 'app-cart',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  isLoading: Boolean = true;
  cartSubscription: Subscription;
  productSubscription: Subscription;
  orderSubscription: Subscription;
  CartItems: Product[] = [];
  products: Product[] = [];
  cart: CartItem[] = [];
  payment: string = 'Cash on Delivery';
  addressSubscription: Subscription;
  currencySubscription: Subscription;
  addresslist: Address[] = [];
  address: string;
  addressDet: Address;
  isAddressEmpty: boolean = false;
  order: Order;
  orders: Order[] = [];
  isCheckingOut: boolean = false;
  subtotal: number = 0;
  grandtotal: number = 0;
  discount: number = 0;
  shippingfee: number = 0;
  isShippingAvailable: boolean = true;
  paymentEnabled: boolean = true;
  shippingRates: {
    country: string;
    region: string;
    countryCode: string;
    weight: string;
    price: string;
  }[];
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private addressService: AddressService,
    private router: Router,
    public sharedService: SharedService,
    private orderService: OrderService,
    public sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.shippingRates = shippingRates;
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

                this.orderSubscription = this.orderService
                  .getOrders()
                  .subscribe((data) => {
                    this.orders = data.map((e) => {
                      return {
                        ...(e.payload.doc.data() as Order),
                        id: e.payload.doc.id,
                      };
                    });

                    this.getTotalBill();
                    this.isLoading = false;
                    this.currencySubscription =
                      this.sharedService.currencyChanged.subscribe((data) => {
                        this.getTotalBill();
                      });
                  });
              });
          });
      }
    );
  }

  getTotalBill() {
    this.getSubtotal();
    this.getDiscount();
    this.getShippingFee();
    this.getGrandTotal();
  }
  getImageUrl(index: number) {
    let imagePath: string = '';
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
    if (this.orderSubscription) this.orderSubscription.unsubscribe();
    if (this.currencySubscription) this.orderSubscription.unsubscribe();
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
    this.subtotal = subtotal * this.sharedService.currencyRate;
  }

  getDiscount() {
    const disc =
      (this.subtotal * this.sharedService.settings[0].discountPct) / 100;
    if (this.orders.length == 0) {
      const subt = this.subtotal / this.sharedService.currencyRate;
      if (subt <= 25) {
        if (
          this.sharedService.settings[0].discountFirstOrder *
            this.sharedService.currencyRate >
          disc
        )
          this.discount =
            this.sharedService.settings[0].discountFirstOrder *
            this.sharedService.currencyRate;
        else
          this.discount =
            (this.subtotal * this.sharedService.settings[0].discountPct) / 100;
      } else {
        this.discount =
          (this.subtotal * this.sharedService.settings[0].discountPct) / 100 +
          this.sharedService.settings[0].discountFirstOrder *
            this.sharedService.currencyRate;
      }
    } else
      this.discount =
        (this.subtotal * this.sharedService.settings[0].discountPct) / 100;
  }

  getShippingFee() {
    if (!this.address || this.address.length === 0) this.shippingfee = 0;
    else {
      this.isAddressEmpty = false;
      this.addressDet = this.addresslist.find((a) => a.id === this.address)!;
      if (this.addressDet.countryCode === 'LB') {
        this.payment = 'Cash on Delivery';
        this.paymentEnabled = false;
        this.isShippingAvailable = true;
        this.shippingfee =
          this.sharedService.settings[0].lebanonShippingFee *
          this.sharedService.currencyShippingRate;
      } else {
        this.payment = 'Credit Card';
        this.paymentEnabled = false;
        let totalWeight: number = 0;
        this.CartItems.forEach((product) => {
          const index = this.cart.findIndex((item) => {
            return item.productID === product.id;
          });
          const qty = this.cart[index].quantity;
          totalWeight += product.weight * qty;
        });
        const weightKG = totalWeight / 1000;
        const shippingWeight = Math.ceil(weightKG * 2) / 2;

        const shippingDetail = this.shippingRates.filter((rate) => {
          return (
            rate.countryCode === this.addressDet.countryCode &&
            parseFloat(rate.weight) == shippingWeight
          );
        });
        if (shippingDetail.length === 0) {
          this.isShippingAvailable = false;
          this.shippingfee = 0;
          return;
        }
        this.isShippingAvailable = true;
        let shippingRate: number = parseFloat(shippingDetail[0].price);
        shippingRate += 3;
        this.shippingfee =
          shippingRate * this.sharedService.currencyShippingRate;
      }
    }
  }

  getGrandTotal() {
    let grandTotal: number = 0;
    grandTotal = this.subtotal - this.discount + this.shippingfee;
    if (grandTotal < 0) grandTotal = 0;
    this.grandtotal = grandTotal;
  }
  placeOrderRequest() {
    if (this.CartItems.length == 0) return;
    if (this.address && this.address.length > 0) {
      this.isCheckingOut = true;
      const addressDet: Address = this.addresslist.find(
        (a) => (a.id = this.address)
      )!;
      this.isAddressEmpty = false;
      const orderDate = new Date();
      const user = JSON.parse(localStorage.getItem('user') || '');
      let email = '';
      if (user) email = user.email;
      this.order = new Order(
        addressDet,
        localStorage.getItem('userId') || '',
        'Requesting Shipping Fee',
        orderDate,
        this.payment == 'Cash on Delivery' ? 'COD' : 'CC',
        this.shippingfee * this.sharedService.currencyRate,
        this.subtotal,
        this.sharedService.userCurrency,
        this.discount,
        this.grandtotal,
        this.cart,
        email,
        true,
        ''
      );
      this.orderService.placeOrder(this.order).then((res) => {
        this.cartService.clearCart();
        this.router.navigate(['ordercomplete']);
      });
    } else {
      this.isAddressEmpty = true;
      this.isCheckingOut = false;
    }
  }
  placeOrder() {
    if (this.CartItems.length == 0) return;
    const user = JSON.parse(localStorage.getItem('user') || '');
    let email = '';
    if (user) email = user.email;

    if (this.address && this.address.length > 0) {
      this.isCheckingOut = true;
      const addressDet: Address = this.addresslist.find(
        (a) => (a.id = this.address)
      )!;
      this.isAddressEmpty = false;
      const orderDate = new Date();
      if (addressDet.countryCode == 'LB') {
        this.payment = 'Cash on Delivery';
        this.paymentEnabled = false;
      }
      if (addressDet.countryCode != 'LB') this.payment = 'Credit Card';

      this.order = new Order(
        addressDet,
        localStorage.getItem('userId') || '',
        'Pending',
        orderDate,
        this.payment == 'Cash on Delivery' ? 'COD' : 'CC',
        this.shippingfee * this.sharedService.currencyRate,
        this.subtotal,
        this.sharedService.userCurrency,
        this.discount,
        this.grandtotal,
        this.cart,
        email,
        true,
        ''
      );
      this.orderService.placeOrder(this.order).then((res) => {
        this.cartService.clearCart();
        this.router.navigate(['ordercomplete']);
      });
    } else {
      this.isAddressEmpty = true;
      this.isCheckingOut = false;
    }
  }
  formatCurrency(price: number) {
    if (this.sharedService.userCurrency == 'USD') {
      return (
        '$ ' +
        (
          Math.round(price * this.sharedService.currencyRate * 100) / 100
        ).toFixed(2)
      );
    } else {
      return price + ' ' + this.sharedService.userCurrency;
    }
  }
}
