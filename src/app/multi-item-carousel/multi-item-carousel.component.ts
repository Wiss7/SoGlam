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
  scrollLeft() {
    this.widgetsContent.nativeElement.scrollLeft -= 350;
  }

  scrollRight() {
    this.widgetsContent.nativeElement.scrollLeft += 350;
  }
  constructor() {}

  ngOnInit(): void {}
}
