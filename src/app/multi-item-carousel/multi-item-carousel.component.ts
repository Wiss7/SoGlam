import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shop/product.model';

@Component({
  selector: 'app-multi-item-carousel',
  templateUrl: './multi-item-carousel.component.html',
  styleUrls: ['./multi-item-carousel.component.css'],
})
export class MultiItemCarouselComponent implements OnInit {
  @ViewChild('widgetsContent') widgetsContent: ElementRef;
  @Input() products: Product[];
  @Input() allProducts: Product[];
  scrollLeft() {
    this.widgetsContent.nativeElement.scrollLeft -= 250;
  }

  scrollRight() {
    this.widgetsContent.nativeElement.scrollLeft += 250;
  }
  getIndex(product: Product) {
    return this.allProducts.findIndex((x) => x.id === product.id);
  }
  constructor() {}

  ngOnInit(): void {}
}
