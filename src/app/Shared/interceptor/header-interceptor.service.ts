import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { NotificationService } from 'src/app/Shared/services/notification/notification.service';
import { ProgressService } from 'src/app/Shared/services/progress/progress.service';
import { UserService } from 'src/app/Shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService implements HttpInterceptor{

  constructor(private userService:UserService,
    private message:NotificationService,
    private router:Router,
    private loader:ProgressService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) 
  {
    //this.loader.show()
    let header=req.headers.set('authorization',this.userService.getToken())
    let r=req.clone({
      headers:header
    })
    
    return next.handle(r).pipe(
      map(result=>{
        console.log(result);
        return result;
      }),
      catchError(
        (err:HttpErrorResponse)=>
      {
        this.showProperMessage(err);
        return throwError(err)
      }),
      finalize(()=>{
        //this.loader.hide()
      })


    )
   
  }

  showProperMessage(err:HttpErrorResponse)
  {

    if(err.url.includes('is-Admin'))
    {
      return
    }



    if(this.router.url.includes('login') && err.status!=401)
    {
      this.message.show("Invalid Email or Password !!")
      return 

    }
    if(err.status==401)
    {
      this.message.show("Session Expired..Please Login Again!!")
      this.userService.logout();
      this.router.navigate(['login'],{
        queryParams:{
          'returnUrl':this.router.url
        }
      })
    return
    }

  }





}
