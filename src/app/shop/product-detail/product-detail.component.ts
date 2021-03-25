import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product;
  index: number;
  selectedImgName: string;
  defaultImagePath: String;
  defaultImageName: string;
  images: { name: string; isDefault: boolean }[];
  isGalleryOpen: Boolean = false;
  gallerySubsription: Subscription;
  isAddingCart: Boolean = false;
  isAddingWishlist: Boolean = false;
  @ViewChild('qty') qty: ElementRef;
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.gallerySubsription = this.productService.toggleGallerySubject.subscribe(
      (isOpen) => {
        this.isGalleryOpen = isOpen;
      }
    );
  }

  AddToCart(productId?: string) {
    this.isAddingCart = true;
    if (!productId) productId = '0';
    var quantity = this.qty.nativeElement.value;
    this.cartService.addToCart(productId, quantity);
    this.isAddingCart = false;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['id'];
      this.product = this.productService.getProduct(this.index);
      this.defaultImageName = this.product.images.filter(
        (image) => image.isDefault === true
      )[0].name;
      this.defaultImagePath =
        '../../../assets/images/products/' + this.defaultImageName;
      this.images = this.product.images.filter(
        (image) => image.isDefault === false
      );
    });
  }

  setSelectedImg(name: string) {
    this.selectedImgName = name;
    this.isGalleryOpen = true;
  }
  ngOnDestroy() {
    this.gallerySubsription.unsubscribe();
  }
}
