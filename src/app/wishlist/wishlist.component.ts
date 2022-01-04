import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../shop/product.model';
import { ProductService } from '../shop/product.service';
import { Wishlist } from './wishlist.model';
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  WishlistItems: Product[] = [];
  wishlist: Wishlist[] = [];
  products: Product[] = [];
  isLoading: Boolean = true;
  wishlistSubscription: Subscription;
  productSubscription: Subscription;
  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.wishlistSubscription = this.wishlistService
      .getWishlist()
      .subscribe((data) => {
        this.wishlist = data.map((e) => {
          return {
            ...(e.payload.doc.data() as Wishlist),
            id: e.payload.doc.id,
          };
        });
        this.productSubscription = this.productService
          .getProductsList()
          .subscribe((data) => {
            this.products = data.map((e) => {
              return {
                ...(e.payload.doc.data() as Product),
                id: e.payload.doc.id,
              };
            });
            this.products.sort((a, b) => {
              return (
                a.type.localeCompare(b.type) || a.name.localeCompare(b.name)
              );
            });
            this.WishlistItems = this.products.filter((product) => {
              return (
                this.wishlist.filter((item) => {
                  return item.productId === product.id;
                }).length > 0
              );
            });
            this.isLoading = false;
          });
      });
  }
  ngOnDestroy() {
    this.productSubscription.unsubscribe();
    this.wishlistSubscription.unsubscribe();
  }
}
