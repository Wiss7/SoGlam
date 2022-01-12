import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { Product } from './product.model';
@Injectable()
export class ProductService implements OnDestroy {
  products: Product[] = [];
  toggleGallerySubject = new Subject<Boolean>();
  searchProductsSubject = new ReplaySubject<{
    products: Product[];
    input: string;
  }>(1);
  searchSubscription: Subscription;
  constructor(private firestore: AngularFirestore) {}

  getProductsList() {
    return this.firestore.collection('Products').snapshotChanges();
  }

  toggleGallery(isOpen: Boolean) {
    this.toggleGallerySubject.next(isOpen);
  }

  searchProducts(searchInput: string) {
    let searchedProd: Product[];

    this.searchSubscription = this.firestore
      .collection('Products')
      .snapshotChanges()
      .subscribe((data) => {
        this.products = data.map((e) => {
          return {
            ...(e.payload.doc.data() as Product),
            id: e.payload.doc.id,
          };
        });
        searchedProd = this.products.filter(this.search(searchInput)).slice();
        this.searchProductsSubject.next({
          products: searchedProd,
          input: searchInput,
        });
      });
  }

  search(searchInput: string) {
    return function (element: Product) {
      return (
        element.name.toLowerCase().indexOf(searchInput.toLowerCase()) >= 0 ||
        element.type.toLowerCase().indexOf(searchInput.toLowerCase()) >= 0 ||
        element.formulation.toLowerCase().indexOf(searchInput.toLowerCase()) >=
          0
      );
    };
  }
  ngOnDestroy() {
    if (this.searchSubscription) this.searchSubscription.unsubscribe();
  }
}
