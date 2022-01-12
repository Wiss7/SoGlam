import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Review } from '../review.model';
import { ReviewsService } from '../reviews.service';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css'],
})
export class ReviewCardComponent implements OnInit {
  @Input('review') review: Review;
  @ViewChild('readAllReview') resetPasswordContent: ElementRef;
  currentReview: string = '';
  constructor(
    public reviewService: ReviewsService,
    public modalService: NgbModal
  ) {}

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

  getDescription() {
    if (this.review.description.length <= 200) return this.review.description;
    return this.review.description.substring(0, 200) + '...';
  }

  ReadMore(review: string) {
    this.currentReview = review;
    this.open(this.resetPasswordContent);
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
