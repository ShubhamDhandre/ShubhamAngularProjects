import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CartService } from 'src/app/Shared/services/cart/cart.service';
import { UserService } from 'src/app/Shared/services/user/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  numberOfItems:number=0;
  isLoggedIn=false;
  isAdmin$:any;
  isAdminUrl=false;

  constructor(private cartService:CartService,private userService:UserService,private router:Router) 
  { 
    router.events.subscribe({
      next:(event)=>
      {
        if(event instanceof NavigationStart)
        {
          let url=(<NavigationStart>event).url
          this.isAdminUrl=url.includes('admin') //check weather it is admin URL
        }
        console.log(event)
      }
    })
  }


  ngOnInit(): void
   {
    this.cartService.cartObservable.subscribe({
      next:(cart)=>
      {
        console.log(cart)
        this.numberOfItems=Object.keys(cart).length // to find out number of Item in cart using cart length
      }
    })

    


    //get token form userservice local storage
    this.userService.loginObservable.subscribe(
      {
        next:()=>
        {
          let token=this.userService.getToken();
          if(token!='')
          {
            this.checkAdmin()
            this.isLoggedIn=true;
          }
          else
          {
            this.isLoggedIn=false;
          }
        }

    })


  }


  //Logout method after logout navigate to Login
  logout()
  {
    this.userService.logout();
    this.router.navigate(['login'])


  }

  //check admin or not
  checkAdmin()
  {
    //check user is admin or not
    // this.userService.isAdmin().subscribe(
    //   (isAdmin)=>
    //   {
    //     this.isAdmin=isAdmin
        
    //   }
    // )

   this.isAdmin$= this.userService.isAdmin()


  }

}
