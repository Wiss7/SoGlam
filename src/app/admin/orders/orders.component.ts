import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/checkout/order.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  Orders: Order[] = [];
  isLoading = true;
  constructor(public adminService: AdminService, public router: Router) {}
  orderSubscription: Subscription;
  ngOnInit() {
    this.orderSubscription = this.adminService.getOrders().subscribe((data) => {
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
  ViewOrder(orderid: string) {
    const index = this.Orders.findIndex((x) => x.id === orderid)!;
    localStorage.setItem(
      'orderdate',
      this.Orders[index].date.toDate().toLocaleDateString() +
        ' ' +
        this.Orders[index].date.toDate().toLocaleTimeString()
    );
    localStorage.setItem('order', JSON.stringify(this.Orders[index]));
    setTimeout(() => {
      this.router.navigate(['/admin/orderedit']);
    }, 500);
  }

  DeleteOrder(id: string) {
    var answer = window.confirm('Are you sure you want to delete this order?');
    if (answer) {
      this.adminService.deleteOrder(id).then((res) => alert('Order Deleted!!'));
    }
  }

  ngOnDestroy() {
    if (this.orderSubscription) this.orderSubscription.unsubscribe();
  }
}
