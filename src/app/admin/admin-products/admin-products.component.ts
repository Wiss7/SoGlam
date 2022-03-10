import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shop/product.model';
import { ProductService } from 'src/app/shop/product.service';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
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
        this.isLoading = false;
      });
  }

  SaveCookie(index: number) {
    localStorage.setItem('editedProduct', JSON.stringify(this.products[index]));
  }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }

  getIndex(product: Product) {
    return this.products.findIndex((x) => x.id === product.id);
  }
}
