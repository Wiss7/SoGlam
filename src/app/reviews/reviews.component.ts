import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Review } from './review.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../shared.service';
import { ReviewsService } from './reviews.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit, OnDestroy {
  reviews: Review[] = [];
  isLoading: boolean = true;
  isUserVerified: boolean = true;
  isWrongPassword: boolean = false;
  isWrongEmail: boolean = false;
  isLoggedIn: Boolean = false;
  isSigningIn: Boolean = false;
  reviewDesc: string = '';
  currentRating = 0;
  loggedInName: string = '';
  isSubmitting: boolean = false;
  reviewSubscription: Subscription;
  @ViewChild('reviewModal') reviewModal: ElementRef;
  @ViewChild('signInModal') signInModal: ElementRef;
  @ViewChild('closeReviewModal') closeReviewModal: ElementRef;
  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private modalService: NgbModal,
    private reviewsService: ReviewsService
  ) {}
  ngOnDestroy() {
    if (this.reviewSubscription) this.reviewSubscription.unsubscribe();
  }
  ngOnInit() {
    this.reviewSubscription = this.reviewsService
      .getReviews()
      .subscribe((data) => {
        this.reviews = data.map((e) => {
          return {
            ...(e.payload.doc.data() as Review),
            id: e.payload.doc.id,
          };
        });
        this.reviews.sort((a, b) => {
          return b.reviewDate.toDate() - a.reviewDate.toDate();
        });
        this.isLoading = false;
      });
  }

  writeReview() {
    if (this.sharedService.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem('user') || '');
      this.loggedInName = user.displayName;
      this.currentRating = 0;
      this.open(this.reviewModal, 'md');
    } else {
      this.open(this.signInModal, 'xl');
    }
  }

  open(content: any, size) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: size,
    });
  }

  SubmitReview(form: NgForm) {
    this.isSubmitting = true;
    const user = JSON.parse(localStorage.getItem('user') || '');
    const review = new Review(
      user,
      new Date(),
      this.currentRating,
      form.value.review,
      ''
    );
    this.reviewsService.addReview(review).then((res) => {
      this.isSubmitting = false;
      this.reviewModal.nativeElement.dismiss();
    });
    const btn: HTMLElement = <HTMLElement>document.querySelector('#btn-close')!;
    btn.click();
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
