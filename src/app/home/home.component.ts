import { Component, OnInit } from '@angular/core';
import { Product } from '../shop/product.model';
import { ProductService } from '../shop/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[];
  bestSellerProducts: Product[] = [];
  newProducts: Product[] = [];
  saleProducts: Product[] = [];
  isLoading: Boolean = true;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductsList().subscribe((data) => {
      this.products = data.map((e) => {
        return {
          ...(e.payload.doc.data() as Product),
          id: e.payload.doc.id,
        };
      });

      this.bestSellerProducts = this.products
        .filter((product) => product.isBestSeller === true)
        .slice();
      this.newProducts = this.products
        .filter((product) => product.isNewArrival === true)
        .slice();
      this.saleProducts = this.products
        .filter((product) => product.isOnSale === true)
        .slice();
    });
    this.isLoading = false;
  }
}
