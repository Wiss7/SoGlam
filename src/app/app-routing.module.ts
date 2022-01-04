import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import { CartComponent } from './cart/cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ProductDetailComponent } from './shop/product-detail/product-detail.component';
import { ShopComponent } from './shop/shop.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AuthGuard } from './auth/auth.guard';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './account/profile/profile.component';
import { AddressComponent } from './account/address/address.component';
import { AddresslistComponent } from './account/address/addresslist/addresslist.component';
import { OrderHistoryComponent } from './account/order-history/order-history.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderCompleteComponent } from './checkout/ordercomplete.component';
import { OrderDetailComponent } from './account/order-history/order-detail/order-detail.component';
import { AdminGuard } from './admin/admin.guard';
import { MessagesComponent } from './admin/messages/messages.component';
import { SettingsComponent } from './admin/settings/settings.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { OrderEditComponent } from './admin/order-edit/order-edit.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { EditProductsComponent } from './admin/edit-products/edit-products.component';
import { ReviewsComponent } from './reviews/reviews.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop/:id', component: ProductDetailComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'contactus', component: ContactUsComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'messages',
        component: MessagesComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'orderedit',
        component: OrderEditComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'admin-products',
        component: AdminProductsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'product-edit/:id',
        component: EditProductsComponent,
        canActivate: [AdminGuard],
        pathMatch: 'full',
      },
    ],
  },
  { path: 'search', component: SearchResultsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },

  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'addresslist',
        component: AddresslistComponent,
      },
      {
        path: 'address/:id',
        component: AddressComponent,
        pathMatch: 'full',
      },

      {
        path: 'orderhistory',
        component: OrderHistoryComponent,
      },
    ],
  },
  { path: 'ordercomplete', component: OrderCompleteComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'order/:id', component: OrderDetailComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
