import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../core/components/login/login.component';
import { SignupComponent } from '../core/components/signup/signup.component';
import { UserAuthGuardService } from '../Shared/auth-guard/user-auth-guard.service';
import { CartComponent } from './components/cart/cart.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';

const routes: Routes = [ {
  path:'orders',
  canActivate:[UserAuthGuardService],
  component:UserOrdersComponent
  },
  {
  path:'cart',
  canActivate:[UserAuthGuardService],
  component:CartComponent
  },
  {
  path:'login',
  component:LoginComponent
  },
  {
  path:'signup',
  component:SignupComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
