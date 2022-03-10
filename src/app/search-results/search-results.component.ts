import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../shop/product.model';
import { ProductService } from '../shop/product.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  searchInput: string = '';
  filteredProducts: Product[] = [];
  allProducts: Product[] = [];
  searchSubscription: Subscription;
  isLoading: Boolean = true;
  constructor(private productService: ProductService) {
    this.searchSubscription =
      this.productService.searchProductsSubject.subscribe((searchObj) => {
        this.filteredProducts = searchObj.products;
        this.searchInput = searchObj.input;
        this.allProducts = searchObj.allproducts;
        this.isLoading = false;
      });
  }

  ngOnInit(): void {}

  getIndex(product: Product) {
    return this.allProducts.findIndex((x) => x.id === product.id);
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
