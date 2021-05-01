import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { ProductCardComponent } from './shop/product-card/product-card.component';
import { ProductDetailComponent } from './shop/product-detail/product-detail.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ProductService } from './shop/product.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { MultiItemCarouselComponent } from './multi-item-carousel/multi-item-carousel.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart/cart.service';
import { AuthComponent } from './auth/auth.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { WishlistComponent } from './wishlist/wishlist.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ShopComponent,
    AboutUsComponent,
    ContactUsComponent,
    PageNotFoundComponent,
    AdminComponent,
    ProductCardComponent,
    ProductDetailComponent,
    ImageGalleryComponent,
    SearchResultsComponent,
    CarouselComponent,
    MultiItemCarouselComponent,
    CartComponent,
    AuthComponent,
    WishlistComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [ProductService, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
