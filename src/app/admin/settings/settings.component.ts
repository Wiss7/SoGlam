import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(
    private sharedService: SharedService,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.currencyRateVal = this.sharedService.settings[0].currencyRate;
    this.totalDiscountVal = this.sharedService.settings[0].discountPct;
    this.firstOrderDiscountVal =
      this.sharedService.settings[0].discountFirstOrder;
  }
  UpdateSettings() {
    this.isUpdating = true;
    this.adminService
      .updateSettings(
        this.currencyRateVal,
        this.firstOrderDiscountVal,
        this.totalDiscountVal
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
