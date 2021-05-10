import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedin = false;
  userData: any;
  constructor(
    public firebaseAuth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {}

  SignIn(email: string, password: string) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }
  setLoggedInUserData(user: any) {
    this.isLoggedin = true;
    this.userData = user;
    localStorage.setItem('user', this.userData);
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
        user.updateProfile({ displayName: firstName });
        this.UpdateUserInfo(userId, email, firstName, lastName, phone);
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

  UpdateUserInfo(
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
    user.id = userId;
    this.firestore.collection('Users').add(Object.assign({}, user));
  }
  LogOut() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }
}
