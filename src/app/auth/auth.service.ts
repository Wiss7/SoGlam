import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { SharedService } from '../shared.service';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedin = false;
  userData: any;
  constructor(
    public firebaseAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    private sharedService: SharedService
  ) {}

  SignIn(email: string, password: string) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }
  setLoggedInUserData(user: any) {
    this.isLoggedin = true;
    this.userData = user;
    localStorage.setItem('user', JSON.stringify(this.userData));
    localStorage.setItem('userId', user.uid);
  }

  SignUp(email: string, password: string) {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  SendVerificationMail(
    userId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string
  ) {
    return this.firebaseAuth.currentUser.then((user) => {
      if (user) {
        user.updateProfile({ displayName: firstName + ' ' + lastName });
        this.AddUserInfo(userId, email, firstName, lastName, phone);
        user.sendEmailVerification();
      }
    });
  }

  ReSendVerificationMail() {
    return this.firebaseAuth.currentUser.then((user) => {
      if (user) {
        user.sendEmailVerification();
      }
    });
  }

  ForgotPassword(email: string) {
    return this.firebaseAuth.sendPasswordResetEmail(email);
  }

  AddUserInfo(
    userId: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string
  ) {
    var user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.id = '';
    user.userId = userId;
    this.firestore.collection('Users').add(Object.assign({}, user));
  }
  LogOut() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    this.sharedService.userCurrency = 'USD';
  }

  getUserInfo() {
    const userId = localStorage.getItem('userId') || '';
    return this.firestore
      .collection('Users', (ref) => ref.where('userId', '==', userId))
      .snapshotChanges();
  }
  updateUserInfo(newInfo: User) {
    return this.firestore
      .doc('Users/' + newInfo.id)
      .update(Object.assign({}, newInfo));
  }
}
