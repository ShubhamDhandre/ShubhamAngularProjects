import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Order } from 'src/app/Shared/models/order';
import { OrderService } from 'src/app/Shared/services/order/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  modelRef:BsModalRef;
  selectedOrder:Order;
  orders$:Observable<Order[]>;
  constructor(private OrderService:OrderService,private modalService:BsModalService) 
  {

   }

  ngOnInit(): void 
  {
    this.collectOrders();
  }

  changeStatus(status:string,order:Order)
  {
    this.OrderService.changeStatus({status:status},order._id)
    .subscribe({
      next:result=>
      {
        console.log(result)
        order.status=status;
      }
    })
  }

showDetails(order:Order,table:any)
{
  this.selectedOrder=order;
this.modelRef=this.modalService.show(table,{class:'modal-lg'})
}
close(){
  this.modelRef.hide()
}

  collectOrders()
  {
    this.orders$=this.OrderService.getAdminOrder();
    this.orders$.toPromise().then(r=>{console.log(r)
  });

  }
}
