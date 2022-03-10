import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Product } from '../shop/product.model';

@Component({
  selector: 'app-multi-item-carousel',
  templateUrl: './multi-item-carousel.component.html',
  styleUrls: ['./multi-item-carousel.component.css'],
})
export class MultiItemCarouselComponent implements OnInit, AfterViewChecked {
  mouseDown = false;
  showArrows = true;
  startX: any;
  scrollX: any;
  slider = document.querySelector<HTMLElement>('.parent');
  @ViewChild('elemt') widgetsContent: ElementRef;
  @Input() products: Product[];
  @Input() allProducts: Product[];

  startDragging(e, flag, el) {
    this.mouseDown = true;
    let pageX = 0;
    if (e.type === 'mousedown') pageX = e.pageX;
    else pageX = e.touches[0].pageX;

    this.startX = pageX - el.offsetLeft;
    this.scrollX = el.scrollLeft;
  }

  isShowArrows() {
    this.showArrows =
      this.widgetsContent.nativeElement.scrollWidth >
      this.widgetsContent.nativeElement.clientWidth;
  }
  stopDragging(e, flag) {
    this.mouseDown = false;
  }
  moveEvent(e, el) {
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    let pageX = 0;
    if (e.type === 'mousemove') pageX = e.pageX;
    else pageX = e.touches[0].pageX;
    const x = pageX - el.offsetLeft;
    const scroll = x - this.startX;
    el.scrollLeft = this.scrollX - scroll;
  }

  scrollLeft() {
    const card = document.querySelector('.card');
    let cardWidth = 0;
    if (card) cardWidth = card?.clientWidth + 40;
    this.widgetsContent.nativeElement.scrollLeft -= cardWidth;
  }

  scrollRight() {
    const card = document.querySelector('.card');
    let cardWidth = 0;
    if (card) cardWidth = card?.clientWidth + 40;
    this.widgetsContent.nativeElement.scrollLeft += cardWidth;
  }
  getIndex(product: Product) {
    return this.allProducts.findIndex((x) => x.id === product.id);
  }
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    this.isShowArrows();
    this.cdr.detectChanges();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.isShowArrows();
  }

  ngOnInit() {}
}
