import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit, AfterViewInit {
  @Input() product: Product;
  @Input() index: number;
  @ViewChild('productImg') Img: ElementRef;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public sharedService: SharedService
  ) {}

  ngOnInit() {}
  getRoute() {
    if (this.router.url === '/home' || this.router.url === '/')
      return 'homecard card';
    else return 'card';
  }
  ngAfterViewInit() {
    let imagePath: string = '../../../assets/images/products/';
    const defaultImg = this.product.images.filter(
      (prod) => prod.isDefault === true
    );
    if (defaultImg.length > 0) imagePath += defaultImg[0].name;
    else imagePath += this.product.images[0].name;

    this.Img.nativeElement.src = imagePath;
  }

  ShowDetails() {
    this.router.navigate(['shop', this.index]);
  }
}
