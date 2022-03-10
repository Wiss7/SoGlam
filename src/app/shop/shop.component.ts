import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit, OnDestroy {
  products: Product[];
  categories: any[];
  isLoading: Boolean = true;
  productSubscription: Subscription;
  constructor(private productService: ProductService) {}

  ngOnInit() {
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
          return a.type.localeCompare(b.type) || a.name.localeCompare(b.name);
        });
        this.categories = [...new Set(this.products.map((p) => p.type.trim()))];
        this.categories.sort((a, b) => {
          return a.localeCompare(b);
        });
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }
}
