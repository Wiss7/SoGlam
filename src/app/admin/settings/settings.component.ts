import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: [],
})
export class SettingsComponent implements OnInit {
  isUpdating = false;
  totalDiscountVal: number = 0;
  firstOrderDiscountVal: number = 0;
  currencyRateVal: number = 0;
  currencyShippingRateVal: number = 0;
  shipFeeLebVal: number = 0;
  imagesVal: string = '';
  constructor(
    private sharedService: SharedService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.currencyRateVal = this.sharedService.settings[0].currencyRate;
    this.totalDiscountVal = this.sharedService.settings[0].discountPct;
    this.firstOrderDiscountVal =
      this.sharedService.settings[0].discountFirstOrder;
    this.imagesVal = this.sharedService.settings[0].images;
    this.shipFeeLebVal = this.sharedService.settings[0].lebanonShippingFee;
    this.currencyShippingRateVal =
      this.sharedService.settings[0].shippingRateCurrency;
  }
  UpdateSettings() {
    this.isUpdating = true;
    this.adminService
      .updateSettings(
        this.currencyRateVal,
        this.firstOrderDiscountVal,
        this.totalDiscountVal,
        this.imagesVal,
        this.shipFeeLebVal,
        this.currencyShippingRateVal
      )
      .then(
        (res) => {
          alert('Settings Updated Successfully');
          this.isUpdating = false;
        },
        (err) => {
          alert('Update Failed! Try Again Later');
          this.isUpdating = false;
        }
      );
  }
}
