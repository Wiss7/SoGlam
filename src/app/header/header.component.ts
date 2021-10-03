import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
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
  @ViewChild('searchBox') searchBox: ElementRef;
  cartCountSubscription: Subscription;
  className: String = '';
  cartCount: number = 0;
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
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
    else this.sideBar.nativeElement.className = this.className + ' active';
  }

  ToggleSearchBar() {
    this.className = this.searchBox.nativeElement.className;
    if (this.searchBox.nativeElement.className.indexOf('active') >= 0)
      this.searchBox.nativeElement.className = this.className.replace(
        'active',
        ''
      );
    else this.searchBox.nativeElement.className = this.className + ' active';
  }

  showadmin() {
    const userId = localStorage.getItem('userId') || '';
    return userId === 'oZ6pFWRMKWMbG48SuniMcLut4mt2';
  }
}
