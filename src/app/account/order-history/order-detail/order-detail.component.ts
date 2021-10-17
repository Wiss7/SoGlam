import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/checkout/order.model';
import { Product } from 'src/app/shop/product.model';
import { ProductService } from 'src/app/shop/product.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  order: Order;
  orderdate: string;
  isLoading: boolean = true;
  productSubscription: Subscription;
  CartItems: Product[] = [];
  products: Product[] = [];
  constructor(public productService: ProductService) {}
  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }
  ngOnInit() {
    this.order = JSON.parse(localStorage.getItem('order') || '');
    this.orderdate = localStorage.getItem('orderdate') || '';
    console.log(this.orderdate);
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
            this.order.items.filter((item) => {
              return item.productID === product.id;
            }).length > 0
          );
        });
        this.isLoading = false;
      });
  }

  getQuantity(productId: string) {
    const index = this.order.items.findIndex((item) => {
      return item.productID === productId;
    });
    if (this.order.items[index]) return this.order.items[index].quantity;
    else return 0;
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
}
