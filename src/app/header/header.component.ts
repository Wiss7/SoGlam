import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @ViewChild('sideBar') sideBar: ElementRef;
  @ViewChild('searchBox') searchBox: ElementRef;
  className: String = '';
  constructor() {}

  ToggleMobileMenu() {
    this.className = this.sideBar.nativeElement.className;
    if (this.sideBar.nativeElement.className.indexOf('active') >= 0)
      this.sideBar.nativeElement.className = this.className.replace(
        'active',
        ''
      );
    else this.sideBar.nativeElement.className = this.className + ' active';
  }

  ToggleSearchBar() {
    this.className = this.searchBox.nativeElement.className;
    if (this.searchBox.nativeElement.className.indexOf('active') >= 0)
      this.searchBox.nativeElement.className = this.className.replace(
        'active',
        ''
      );
    else this.searchBox.nativeElement.className = this.className + ' active';
  }
}
