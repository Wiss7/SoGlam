import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/checkout/order.model';
import { OrderService } from 'src/app/checkout/order.service';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit, OnDestroy {
  Orders: Order[] = [];
  isLoading = true;
  constructor(public orderService: OrderService) {}
  orderSubscription: Subscription;
  ngOnInit() {
    this.orderSubscription = this.orderService.getOrders().subscribe((data) => {
      this.Orders = data.map((e) => {
        return {
          ...(e.payload.doc.data() as Order),
          id: e.payload.doc.id,
        };
      });
      this.Orders.sort((a, b) => {
        return b.date.toDate() - a.date.toDate();
      });

      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.orderSubscription) this.orderSubscription.unsubscribe();
  }
}
