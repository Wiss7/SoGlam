import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { EventEmitter } from '@angular/core';
import { Product } from '../product.model';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit, AfterViewInit {
  mousePosition = {
    x: 0,
    y: 0,
  };
  @Input() product: Product;
  @Input() index: number;
  @ViewChild('productImg') Img: ElementRef;
  @Output() onCardClick = new EventEmitter();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public sharedService: SharedService
  ) {}

  ngOnInit() {}
  getRoute() {
    if (
      this.router.url === '/home' ||
      this.router.url === '/' ||
      this.route.component === ProductDetailComponent
    )
      return 'homecard card';
    else return 'card';
  }
  ngAfterViewInit() {
    let imagePath: string = '';
    const defaultImg = this.product.images.filter(
      (prod) => prod.isDefault === true
    );
    if (defaultImg.length > 0) imagePath += defaultImg[0].name;
    else imagePath += this.product.images[0].name;

    this.Img.nativeElement.src = imagePath;
  }
  mouseDown($event) {
    this.mousePosition.x = $event.screenX;
    this.mousePosition.y = $event.screenY;
  }

  ShowDetails($event) {
    if (
      this.mousePosition.x === $event.screenX &&
      this.mousePosition.y === $event.screenY
    ) {
      if (this.router.url === '/admin/admin-products')
        this.router.navigate(['admin/product-edit', this.index]);
      else this.router.navigate(['shop', this.index]);
    }
  }
}
