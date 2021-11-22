import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FaqComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    var acc = document.getElementsByClassName('accordion');
    for (var i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function (e) {
        if (e && e.target) {
          const btn = e.target as HTMLButtonElement;
          btn.classList.toggle('active');

          /* Toggle between hiding and showing the active panel */
          var panel = <HTMLDivElement>btn.nextElementSibling;
          if (panel.style.display === 'block') {
            panel.style.display = 'none';
          } else {
            panel.style.display = 'block';
          }
        }
      });
    }
  }
}
