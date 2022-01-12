import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm, NgModel } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CartService } from 'src/app/cart/cart.service';
import { SharedService } from 'src/app/shared.service';
import { Wishlist } from 'src/app/wishlist/wishlist.model';
import { WishlistService } from 'src/app/wishlist/wishlist.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product;
  products: Product[] = [];
  index: number;
  selectedImgName: string;
  defaultImagePath: string;
  defaultImageName: string;
  images: { name: string; isDefault: boolean }[];
  isGalleryOpen: Boolean = false;
  gallerySubscription: Subscription;
  wishlistSubscription: Subscription;
  productSubscription: Subscription;
  isAddingCart: Boolean = false;
  isAddingWishlist: Boolean = false;
  isInWishlist: Boolean = false;
  wishlist: Wishlist[] = [];
  isUserVerified: boolean = true;
  isWrongPassword: boolean = false;
  isWrongEmail: boolean = false;
  isLoggedIn: Boolean = false;
  isSigningIn: Boolean = false;
  isLoading: Boolean = true;

  @ViewChild('qty') qty: ElementRef;
  @ViewChild('signInModal') signInModal: ElementRef;
  @ViewChild('cartModal') cartModal: ElementRef;
  @ViewChild('email') email: NgModel;
  @ViewChild('closeModal') closeModal: ElementRef;
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private wishlistService: WishlistService,
    private firebaseAuth: AngularFireAuth,
    private modalService: NgbModal,
    public sharedService: SharedService,
    public sanitizer: DomSanitizer
  ) {
    this.gallerySubscription =
      this.productService.toggleGallerySubject.subscribe((isOpen) => {
        this.isGalleryOpen = isOpen;
      });
  }

  AddToCart(productId?: string) {
    if (this.isLoggedIn) {
      this.isAddingCart = true;
      if (!productId) {
        this.isAddingCart = false;
        return;
      }
      var quantity = this.qty.nativeElement.value;
      this.cartService.addToCartDB(productId, quantity)?.then((res) => {
        this.isAddingCart = false;
        this.open(this.cartModal);
      });
    } else {
      this.isAddingCart = true;
      if (!productId) {
        this.isAddingCart = false;
        return;
      }
      var quantity = this.qty.nativeElement.value;
      this.cartService.addToCartStorage(productId, quantity);
      this.isAddingCart = false;
      this.open(this.cartModal);
    }
  }
  decreaseQuantity() {
    if (this.qty.nativeElement.value > 1)
      this.qty.nativeElement.value = +this.qty.nativeElement.value - 1;
  }

  increaseQuantity() {
    if (this.qty.nativeElement.value < 100)
      this.qty.nativeElement.value = +this.qty.nativeElement.value + 1;
  }

  checkQuantity() {
    if (this.qty.nativeElement.value <= 0) this.qty.nativeElement.value = 1;
    if (this.qty.nativeElement.value > 100) this.qty.nativeElement.value = 100;
  }
  checkNumber($event) {
    if (!isFinite($event.key)) return false;
    return true;
  }
  AddToWishlist() {
    if (this.isLoggedIn) {
      const userId = localStorage.getItem('userId') || '';
      const wishlistItem: Wishlist = {
        userid: userId,
        productId: this.product.id,
        id: '',
      };
      this.wishlistService.addWishlist(wishlistItem).then((responseData) => {
        this.isInWishlist = true;
      });
    } else {
      this.open(this.signInModal);
    }
    return false;
  }

  RemoveFromWishlist() {
    const userId = localStorage.getItem('userId') || '';
    const wishlistId = this.wishlist.find(
      (x) => x.userid === userId && x.productId === this.product.id
    )?.id;
    this.wishlistService
      .deleteWishlist(wishlistId)
      .then((res) => (this.isInWishlist = false));
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['id'];

      this.productSubscription = this.productService
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
          this.product = this.products[this.index];
          this.defaultImageName = this.product.images.filter(
            (image) => image.isDefault === true
          )[0].name;
          this.defaultImagePath = this.defaultImageName;
          this.images = this.product.images.filter(
            (image) => image.isDefault === false
          );
          this.isLoading = false;
        });

      this.firebaseAuth.onAuthStateChanged((user) => {
        if (user && user.emailVerified) {
          this.isLoggedIn = true;
          localStorage.setItem('userId', user.uid);
          this.wishlistSubscription = this.wishlistService
            .getWishlist()
            .subscribe((data) => {
              this.wishlist = data.map((e) => {
                return {
                  ...(e.payload.doc.data() as Wishlist),
                  id: e.payload.doc.id,
                };
              });
              this.isInWishlist =
                this.wishlist.filter((item) => {
                  return (
                    item.userid == user.uid && item.productId == this.product.id
                  );
                }).length > 0;
            });
        } else {
          this.wishlist = [];
          this.isLoggedIn = false;
          localStorage.setItem('userId', '');
          this.isInWishlist = false;
        }
      });
    });
  }

  setSelectedImg(name: string) {
    this.selectedImgName = name;
    this.isGalleryOpen = true;
  }
  ngOnDestroy() {
    if (this.gallerySubscription) this.gallerySubscription.unsubscribe();
    if (this.wishlistSubscription) this.wishlistSubscription.unsubscribe();
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  SignIn(form: NgForm) {
    this.isSigningIn = true;
    this.authService.SignIn(form.value.email, form.value.password).then(
      (res) => {
        if (res.user)
          if (!res.user.emailVerified) {
            this.isUserVerified = false;
            this.isWrongEmail = false;
            this.isWrongPassword = false;
            this.authService.ReSendVerificationMail();
            this.isSigningIn = false;
          } else {
            this.authService.setLoggedInUserData(res.user);
            this.isSigningIn = false;
            document.getElementById('closeModal')!.click();
          }
      },
      (err) => {
        this.isSigningIn = false;
        if (err.code == 'auth/wrong-password') {
          this.isUserVerified = true;
          this.isWrongEmail = false;
          this.isWrongPassword = true;
        } else if (err.code == 'auth/user-not-found') {
          this.isUserVerified = true;
          this.isWrongEmail = true;
          this.isWrongPassword = false;
        }
      }
    );
  }
}
