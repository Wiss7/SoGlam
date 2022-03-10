import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.css'],
})
export class HomeCategoriesComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewCategory(section: string) {
    this.router.navigate(['/shop/section/' + section]);
  }
}
