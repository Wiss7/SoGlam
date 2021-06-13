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
import { cities } from './cities';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit, OnDestroy {
  isUpdating: boolean = false;
  user: User[];
  userSubscription: Subscription;
  @ViewChild('email') email: NgModel;
  @ViewChild('errorContent') errorContent: ElementRef;

  firstnameVal: string = '';
  lastnameVal: string = '';
  phoneVal: string = '';
  streetVal: string = '';
  buildingVal: string = '';
  provinceVal: string = '';
  postalcodeVal: string = '';
  cityVal: string = '';
  deliverynoteVal: string = '';
  provinces = [
    'Akkar',
    'Baalbek-El Hermel',
    'Beirut',
    'Bekaa',
    'El Nabatieh',
    'Mount Lebanon',
    'North',
    'South',
  ];
  provinceCities: {
    id: String;
    CityName: String;
    Governorate: String;
  }[] = [];
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

  UpdateInfo(infoForm: NgForm) {
    const userId = localStorage.getItem('userId') || '';
    const newInfo = new User();
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

  onProvinceSelected(province: String) {
    this.getCitiesByProvince(province);
  }

  getCitiesByProvince(province: String) {
    if (province.length == 0) {
      this.provinceCities = [];
      return;
    }
    this.provinceCities = cities
      .filter((city) => city.Governorate === province)
      .sort((n1, n2) => {
        if (n1.CityName > n2.CityName) {
          return 1;
        }

        if (n1.CityName < n2.CityName) {
          return -1;
        }

        return 0;
      })
      .slice();
  }
}
