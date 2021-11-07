import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Address } from '../address.model';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-addresslist',
  templateUrl: './addresslist.component.html',
  styleUrls: ['./addresslist.component.css'],
})
export class AddresslistComponent implements OnInit, OnDestroy {
  addressSubscription: Subscription;
  addresslist: Address[] = [];
  isLoading: Boolean = true;

  constructor(private addressService: AddressService, private router: Router) {}

  ngOnInit(): void {
    this.addressSubscription = this.addressService
      .getAddressList()
      .subscribe((data) => {
        this.addresslist = data.map((e) => {
          return {
            ...(e.payload.doc.data() as Address),
            id: e.payload.doc.id,
          };
        });
        this.isLoading = false;
      });
  }

  DeleteAddress(id: string) {
    this.addressService.deleteAddress(id).then((res) => {
      console.log('Success');
    });
  }
  editAddress(id: string) {
    const addr = this.addresslist.find((address) => address.id === id);
    if (addr) {
      this.addressService.editAddress(addr);
      this.router.navigate(['/account', 'address', id]);
    }
  }

  ngOnDestroy() {
    if (this.addressSubscription) this.addressSubscription.unsubscribe();
  }
}
