import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/Shared/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private userService:UserService,private router:Router) 
  { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  {
    return this.userService.isAdmin().pipe(
      map(result=>
      {
        if(!result)
        {
          console.log("You are not a Admin");
          this.router.navigate([''],{
            queryParams:{
              returnUrl:state.url
            }
          })
        }
        
      
        return result
      })
    )
  }




}
