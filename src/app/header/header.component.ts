import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../shop/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('sideBar') sideBar: ElementRef;
  @ViewChild('storeInfo') storeInfo: ElementRef;
  @ViewChild('searchBox') searchBox: ElementRef;
  cartCountSubscription: Subscription;
  className: string = '';
  cartCount: number = 0;
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private renderer: Renderer2
  ) {}
  ngOnInit() {
    this.cartCount = this.cartService.getCartItemsListCount();
    this.cartCountSubscription = this.cartService.cartItemsChanged.subscribe(
      (cartItems) => (this.cartCount = cartItems.length)
    );
  }
  ngOnDestroy() {
    this.cartCountSubscription.unsubscribe();
  }
  searchProducts(searchInput: string) {
    this.ToggleSearchBar();
    searchInput = searchInput.replace(/[^a-zA-Z ]/g, '').trim();
    if (searchInput == '') return;
    this.router.navigate(['search']);
    this.productService.searchProducts(searchInput);
  }

  ToggleMobileMenu() {
    this.className = this.sideBar.nativeElement.className;
    if (this.sideBar.nativeElement.className.indexOf('active') >= 0)
      this.sideBar.nativeElement.className = this.className.replace(
        'active',
        ''
      );
    else {
      const element = document.querySelector('.sticky-top')!;
      if (element !== null && element instanceof HTMLElement) {
        this.sideBar.nativeElement.className = this.className + ' active';
        this.renderer.setStyle(this.sideBar.nativeElement, 'top', `0px`);
      }
    }
  }

  ToggleSearchBar() {
    this.className = this.searchBox.nativeElement.className;
    if (this.searchBox.nativeElement.className.indexOf('active') >= 0)
      this.searchBox.nativeElement.className = this.className.replace(
        'active',
        ''
      );
    else {
      const element = document.querySelector('.sticky-top')!;
      if (element !== null && element instanceof HTMLElement) {
        this.searchBox.nativeElement.className = this.className + ' active ';
        this.renderer.setStyle(
          this.searchBox.nativeElement,
          'top',
          `${element.getBoundingClientRect().top}px`
        );
      }
    }
  }

  showadmin() {
    const userId = localStorage.getItem('userId') || '';
    return userId === 'kdmHwzO7mqVS8UgEGBFY3xUdwjt1';
  }

  toggleInfo() {
    this.className = this.storeInfo.nativeElement.className;
    if (this.className.indexOf('active') >= 0)
      this.storeInfo.nativeElement.className = this.className.replace(
        'active',
        ''
      );
    else this.storeInfo.nativeElement.className = this.className + ' active';
  }
}
