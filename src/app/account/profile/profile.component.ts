import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm, NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  isUpdating: boolean = false;
  user: User[];
  userSubscription: Subscription;
  @ViewChild('email') email: NgModel;
  @ViewChild('resetpassword') resetPasswordContent: ElementRef;
  @ViewChild('errorContent') errorContent: ElementRef;
  emailVal: string = '';
  firstnameVal: string = '';
  lastnameVal: string = '';
  phoneVal: string = '';
  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    public firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.getUserInfo().subscribe((data) => {
      this.user = data.map((e) => {
        return {
          ...(e.payload.doc.data() as User),
          id: e.payload.doc.id,
        };
      });
      this.emailVal = this.user[0].email;
      this.firstnameVal = this.user[0].firstName;
      this.lastnameVal = this.user[0].lastName;
      this.phoneVal = this.user[0].phone;
      this.isLoading = false;
    });
  }
  ngOnDestroy() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  ResetPassword() {
    const ResetEmail = this.email.value;
    this.authService.ForgotPassword(ResetEmail).then(
      (data) => {
        this.open(this.resetPasswordContent);
      },
      (err) => {
        this.open(this.errorContent);
      }
    );
  }

  UpdateInfo(infoForm: NgForm) {
    const userId = localStorage.getItem('userId') || '';
    const newInfo = new User();
    newInfo.email = this.emailVal;
    newInfo.firstName = this.firstnameVal;
    newInfo.lastName = this.lastnameVal;
    newInfo.phone = this.phoneVal;
    newInfo.id = this.user[0].id;
    newInfo.userId = userId;
    this.isUpdating = true;
    this.authService.updateUserInfo(newInfo).then((res) => {
      this.isUpdating = false;
    });
  }
}
