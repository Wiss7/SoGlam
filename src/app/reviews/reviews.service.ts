import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Review } from './review.model';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private reviews: Review[];
  constructor(private firestore: AngularFirestore) {}

  addReview(review: Review) {
    return this.firestore.collection('Reviews').add(Object.assign({}, review));
  }

  getReviews() {
    return this.firestore.collection('Reviews').snapshotChanges();
  }
}
