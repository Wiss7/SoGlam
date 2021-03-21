import { Injectable } from '@angular/core';
import { Product } from '../shop/product.model';
import { ProductService } from '../shop/product.service';

@Injectable()
export class HomeService {
  private homeData = {
    homeImages: [],
    beautyTips: [],
    bestSellers: [typeof Product],
    newArrivals: [typeof Product],
  };
  constructor(private productService: ProductService) {}
}
