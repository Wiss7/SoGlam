import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shop/product.model';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css'],
})
export class EditProductsComponent implements OnInit {
  isAddingNew: boolean = false;
  isLoading: boolean = true;
  isUpdating: boolean = false;
  id: string = '';
  discountPriceVal: number = 0;
  priceVal: number = 0;
  sizeVal: string = '';
  typeVal: string = '';
  descriptionVal: string = '';
  nameVal: string = '';
  imagesVal: string = '';
  isBestSellerVal: boolean = false;
  isNewArrivalVal: boolean = true;
  isOnSaleVal: boolean = false;
  howToUseVal: string = '';
  ingredientsVal: string = '';
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params) => {
      const param1 = params.get('id');
      if (param1 === '-1') {
        this.isAddingNew = true;
        return;
      }
      if (param1) this.id = param1;
    });
  }

  ngOnInit(): void {
    if (!this.isAddingNew) {
      const product: Product = JSON.parse(
        localStorage.getItem('editedProduct') || ''
      );
      this.id = product.id;
      this.discountPriceVal = product.discountPrice;
      this.priceVal = product.price;
      this.sizeVal = product.size;
      this.typeVal = product.type;
      this.descriptionVal = product.description;
      this.nameVal = product.name;
      this.isBestSellerVal = product.isBestSeller;
      this.isNewArrivalVal = product.isNewArrival;
      this.isOnSaleVal = product.isOnSale;
      this.ingredientsVal = product.ingredients;
      this.howToUseVal = product.howToUse;
      this.isLoading = false;
      product.images.forEach((img) => {
        this.imagesVal = this.imagesVal + img.name + ', ';
      });
      this.imagesVal = this.imagesVal.replace(/,\s*$/, '');
    } else this.isLoading = false;
  }

  UpdateInfo(infoForm: NgForm) {}
}
