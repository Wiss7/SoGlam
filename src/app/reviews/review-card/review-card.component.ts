import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../review.model';
import { ReviewsService } from '../reviews.service';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css'],
})
export class ReviewCardComponent implements OnInit {
  @Input('review') review: Review;

  constructor(public reviewService: ReviewsService) {}

  ngOnInit() {}

  DeleteReview(id?: string) {
    if (id) {
      var result = window.confirm(
        'Are you sure you want to delete this review?'
      );
      if (result) {
        this.reviewService.deleteReviews(id).then(() => {
          alert('Review Deleted SuccessFully!');
        });
      }
    }
  }

  isAdmin() {
    const userId = localStorage.getItem('userId') || '';
    return userId === 'kdmHwzO7mqVS8UgEGBFY3xUdwjt1';
  }
}
