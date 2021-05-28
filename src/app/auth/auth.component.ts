import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  passwordMatch: boolean = true;
  isSignUpUserExist: boolean = false;
  isUserVerified: boolean = true;
  isWrongPassword: boolean = false;
  isWrongEmail: boolean = false;
  isSigningIn: Boolean = false;
  isSigningUp: Boolean = false;
  redirectURL: UrlTree;
  @ViewChild('content') successContent: ElementRef;
  @ViewChild('errorContent') errorContent: ElementRef;
  @ViewChild('emailNotFound') emailNotFoundContent: ElementRef;
  @ViewChild('resetpassword') resetPasswordContent: ElementRef;
  @ViewChild('email') email: NgModel;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ResetPassword() {
    if (!this.email.valid) return;
    const ResetEmail = this.email.value;
    this.authService.ForgotPassword(ResetEmail).then(
      (data) => {
        this.open(this.resetPasswordContent);
      },
      (err) => {
        if (err.code === 'auth/invalid-email')
          this.open(this.emailNotFoundContent);
        else this.open(this.errorContent);
      }
    );
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
            let params = this.route.snapshot.queryParams;
            if (params['redirectURL']) {
              this.redirectURL = params['redirectURL'];
            }

            if (this.redirectURL) {
              this.router
                .navigateByUrl(this.redirectURL)
                .catch(() => this.router.navigate(['home']));
            } else {
              this.router.navigate(['home']);
            }
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
        } else this.open(this.errorContent);
      }
    );
  }

  SignUp(signupForm: NgForm) {
    const email = signupForm.value.signupemail;
    const password = signupForm.value.signuppassword;
    const confirmpassword = signupForm.value.confirmpassword;

    if (!signupForm.valid) return;
    if (confirmpassword !== password) {
      this.passwordMatch = false;
      return;
    } else this.passwordMatch = true;

    const firstName = signupForm.value.firstname;
    const lastName = signupForm.value.lastname;
    const phone = signupForm.value.phone;
    this.isSigningUp = true;
    this.authService.SignUp(email, password).then(
      (resData) => {
        if (resData.user)
          this.authService
            .SendVerificationMail(
              resData.user.uid,
              email,
              firstName,
              lastName,
              phone
            )
            .then(
              (responseData) => {
                this.open(this.successContent);
                signupForm.reset();
                this.isSigningUp = false;
              },
              (error) => {
                this.open(this.errorContent);
                this.isSigningUp = false;
              }
            );
      },
      (err) => {
        if (err.code === 'auth/email-already-in-use') {
          this.isSignUpUserExist = true;
          this.isSigningUp = false;
        } else this.open(this.errorContent);
      }
    );
  }
  ngOnInit(): void {}

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
