import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Address } from './address.model';
import { AddressService } from './address.service';
import { countries } from './countries';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit, OnDestroy {
  isUpdating: boolean = false;
  userSubscription: Subscription;
  @ViewChild('errorContent') errorContent: ElementRef;
  titleVal: string = '';
  firstnameVal: string = '';
  lastnameVal: string = '';
  phoneVal: string = '';
  streetVal: string = '';
  buildingVal: string = '';
  countryVal: string = '';
  provinceVal: string = '';
  postalcodeVal: string = '';
  cityVal: string = '';
  deliverynoteVal: string = '';
  floorVal: string = '';
  countries: {
    name: String;
    code: String;
  }[] = [];
  isLoading: boolean = true;
  isAddingNew: boolean = false;
  id: string = '';
  constructor(
    private modalService: NgbModal,
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.countries = countries;
    this.route.paramMap.subscribe((params) => {
      const param1 = params.get('id');
      if (param1 === '0') {
        this.isAddingNew = true;
        return;
      }
      if (param1) this.id = param1;
    });
  }

  ngOnInit() {
    if (!this.isAddingNew) {
      const addr = this.addressService.getAddress();
      this.titleVal = addr.title;
      this.firstnameVal = addr.firstName;
      this.lastnameVal = addr.lastName;
      this.phoneVal = addr.phone;
      this.streetVal = addr.street;
      this.buildingVal = addr.building;
      this.provinceVal = addr.province;
      this.countryVal = addr.country;
      this.postalcodeVal = addr.postalCode;
      this.deliverynoteVal = addr.deliveryNote;
      this.cityVal = addr.city;
      this.floorVal = addr.floor;
      this.isLoading = false;
    } else this.isLoading = false;
  }
  ngOnDestroy() {}
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  UpdateInfo(infoForm: NgForm) {
    const userId = localStorage.getItem('userId') || '';
    const newInfo = new Address(
      userId,
      this.titleVal,
      this.firstnameVal,
      this.lastnameVal,
      this.phoneVal,
      this.countryVal,
      this.provinceVal,
      this.cityVal,
      this.streetVal,
      this.buildingVal,
      this.postalcodeVal,
      this.deliverynoteVal,
      this.floorVal,
      ''
    );
    this.isUpdating = true;

    if (this.isAddingNew) {
      this.addressService.AddNewAddress(newInfo).then((res) => {
        infoForm.reset();
        this.isUpdating = false;
        this.router.navigate(['account/addresslist']);
      });
    } else {
      newInfo.id = this.id;
      this.addressService.updateAddress(newInfo).then((res) => {
        infoForm.reset();
        this.isUpdating = false;
        this.router.navigate(['account/addresslist']);
      });
    }
  }
}
