import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminNewProductComponent } from './components/admin/admin-new-product/admin-new-product.component';
import { AdminCustomersComponent } from './components/admin/admin-customers/admin-customers.component';
import { AdminDashboardCardComponent } from './components/admin/admin-dashboard-card/admin-dashboard-card.component';
import { SharedModule } from '../Shared/shared.module';


@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminDashboardComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    AdminNewProductComponent,
    AdminCustomersComponent,
    AdminDashboardCardComponent
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
