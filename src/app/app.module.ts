import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { ModalModule } from 'ngx-bootstrap/modal';

import { HeaderInterceptorService } from 'src/app/Shared/interceptor/header-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
   
   
    
  ],
  imports: [
    BrowserModule,
    UserModule,
    AdminModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatProgressBarModule
 

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:HeaderInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
