import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../shop/product.model';
import { ProductService } from '../shop/product.service';

@Component({
  selector: 'app-shop-category',
  templateUrl: './shop-category.component.html',
  styleUrls: ['./shop-category.component.css'],
})
export class ShopCategoryComponent implements OnInit {
  products: Product[];
  categories: any[];
  isLoading: Boolean = true;
  productSubscription: Subscription;
  section: string;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
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
        this.section = this.route.snapshot.params['section'];
        this.section = this.section
          .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
          .replace(' ', ' & ');
        this.isLoading = false;
      });
  }

  getIndex(product: Product) {
    return this.products.findIndex((x) => x.id === product.id);
  }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }
}
