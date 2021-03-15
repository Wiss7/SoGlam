import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProductService } from '../shop/product.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
})
export class ImageGalleryComponent implements OnInit, AfterViewInit {
  @Input() images: { name: string; isDefault: boolean }[];
  @Input() selectedImgName: string;
  @ViewChild('Image') img: ElementRef;
  constructor(private productService: ProductService) {}
  ngAfterViewInit() {
    this.img.nativeElement.src =
      '../../assets/images/products/' + this.selectedImgName;
  }
  ngOnInit() {}
  closeGallery() {
    this.productService.toggleGallerySubject.next(false);
  }
  showNext() {
    const index = this.images.findIndex((image) => {
      return image.name === this.selectedImgName;
    });
    let nextIndex = index + 1;
    if (nextIndex >= this.images.length) nextIndex = 0;
    this.selectedImgName = this.images[nextIndex].name;
    this.img.nativeElement.src =
      '../../assets/images/products/' + this.selectedImgName;
  }
  showPrev() {
    const index = this.images.findIndex((image) => {
      return image.name === this.selectedImgName;
    });
    let prevIndex = index - 1;
    if (prevIndex < 0) prevIndex = this.images.length - 1;
    this.selectedImgName = this.images[prevIndex].name;
    this.img.nativeElement.src =
      '../../assets/images/products/' + this.selectedImgName;
  }
}
