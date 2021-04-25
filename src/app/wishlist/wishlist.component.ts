import { Component, OnInit } from '@angular/core';
import { Product } from '../shop/product.model';
import { ProductService } from '../shop/product.service';
import { Wishlist } from './wishlist.model';
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  WishlistItems: Product[] = [];
  wishlist: Wishlist[] = [];
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe((data) => {
      this.wishlist = data.map((e) => {
        return {
          ...(e.payload.doc.data() as Wishlist),
          id: e.payload.doc.id,
        };
      });
      this.productService.getProductsList().subscribe((data) => {
        this.products = data.map((e) => {
          return {
            ...(e.payload.doc.data() as Product),
            id: e.payload.doc.id,
          };
        });
        this.WishlistItems = this.products.filter((product) => {
          return (
            this.wishlist.filter((item) => {
              return item.productId === product.id;
            }).length > 0
          );
        });
      });
    });
  }
}
