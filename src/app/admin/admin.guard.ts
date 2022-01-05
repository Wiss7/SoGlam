import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private firebaseAuth: AngularFireAuth) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.onAuthStateChanged((user) => {
        if (user && user.uid == 'kdmHwzO7mqVS8UgEGBFY3xUdwjt1') {
          resolve(true);
        } else {
          this.router.navigate(['home'], {
            queryParams: { redirectURL: state.url },
          });
          resolve(false);
        }
      });
    });
  }
}
