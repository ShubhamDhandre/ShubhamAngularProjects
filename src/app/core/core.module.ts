import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../Shared/shared.module';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
   
    LoginComponent,
    SignupComponent,
  ],
  
  imports: [
   SharedModule,
    CoreRoutingModule,
    UserModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    HomeComponent,
   
    LoginComponent,
    SignupComponent,
  ],
})
export class CoreModule { }
