import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Order } from '../checkout/order.model';
import { OrderService } from '../checkout/order.service';
import { SharedService } from '../shared.service';
import { Product } from '../shop/product.model';
import { ProductService } from '../shop/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  bestSellerProducts: Product[] = [];
  newProducts: Product[] = [];
  saleProducts: Product[] = [];
  isLoading: Boolean = true;
  subscription: Subscription;
  orderSubscription: Subscription;
  orders: Order[] = [];
  @ViewChild('content') content: ElementRef;
  constructor(
    private modalService: NgbModal,
    private productService: ProductService,
    private sharedService: SharedService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.products.length === 0)
      this.subscription = this.productService
        .getProductsList()
        .subscribe((data) => {
          this.products = data.map((e) => {
            return {
              ...(e.payload.doc.data() as Product),
              id: e.payload.doc.id,
            };
          });
          this.products.sort((a, b) => {
            return a.type.localeCompare(b.type) || a.name.localeCompare(b.name);
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
    if (!this.sharedService.isLoggedIn) {
      setTimeout(() => {
        if (!this.sharedService.isDiscountShown) {
          this.sharedService.isDiscountShown = true;
          this.modalService.open(this.content, {
            ariaLabelledBy: 'modal-basic-title',
            size: 'lg',
            windowClass: 'discount-modal',
          });
        }
      }, 500);
    }
  }
  goToSignUp() {
    this.router.navigate(['/account/profile']);
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe;
  }
}
