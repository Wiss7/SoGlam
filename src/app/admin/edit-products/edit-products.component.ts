import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shop/product.model';
import { AdminService } from '../admin.service';
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
  sizeVal: number = 0;
  weightVal: number = 0;
  typeVal: string = '';
  descriptionVal: string = '';
  nameVal: string = '';
  imagesVal: string = '';
  isBestSellerVal: boolean = false;
  isNewArrivalVal: boolean = true;
  isOnSaleVal: boolean = false;
  howToUseVal: string = '';
  ingredientsVal: string = '';
  isDeleting: boolean = false;
  updateProduct: Product;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {
    this.route.paramMap.subscribe((params) => {
      const param1 = params.get('id');

      if (param1 === '-1') {
        this.isAddingNew = true;
        return;
      }
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
      this.weightVal = product.weight;
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

  UpdateInfo(infoForm: NgForm) {
    this.imagesVal = this.imagesVal.replace(/,\s*$/, '');
    const imagesNames = this.imagesVal.split(',');
    this.updateProduct = new Product(
      this.nameVal,
      this.descriptionVal,
      this.typeVal,
      this.sizeVal,
      this.weightVal,
      this.priceVal,
      0,
      this.discountPriceVal,
      this.ingredientsVal,
      this.howToUseVal,
      this.isOnSaleVal,
      this.isNewArrivalVal,
      this.isBestSellerVal,
      [],
      [],
      this.id
    );
    imagesNames.forEach((img) => {
      this.updateProduct.images.push({
        name: img.replace(/,\s*$/, ''),
        isDefault: false,
      });
    });
    this.updateProduct.images[0].isDefault = true;
    if (this.isAddingNew) {
      this.isUpdating = true;
      this.adminService.addProduct(this.updateProduct).then(
        (responseData) => {
          alert('Product added successfully!!');
          infoForm.reset();
          this.isUpdating = false;
        },
        (error) => {
          alert('an error has occured, try again later');
          this.isUpdating = false;
        }
      );
    } else {
      this.isUpdating = true;
      this.adminService.updateProduct(this.updateProduct).then(
        (responseData) => {
          localStorage.setItem(
            'editedProduct',
            JSON.stringify(this.updateProduct)
          );
          alert('Product updated successfully!!');
          this.isUpdating = false;
        },
        (error) => {
          alert('an error has occured, try again later');
          this.isUpdating = false;
        }
      );
    }
  }

  deleteProduct() {
    var answer = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (answer) {
      this.adminService
        .deleteProduct(this.id)
        .then((res) => this.router.navigate(['admin/admin-products']));
    }
  }
}
