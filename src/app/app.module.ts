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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [ProductService, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
