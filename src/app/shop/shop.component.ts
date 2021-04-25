import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  products: Product[];

  constructor(
    private productService: ProductService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.productService.getProductsList().subscribe((data) => {
      this.products = data.map((e) => {
        return {
          ...(e.payload.doc.data() as Product),
          id: e.payload.doc.id,
        };
      });
    });
  }
}
