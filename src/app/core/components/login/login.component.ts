import { HttpErrorResponse } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from 'src/app/Shared/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:HTMLFormElement
  error:string;
  success:string;
  returnUrl: string;


  constructor(private userService:UserService,
    private route:ActivatedRoute,
    private router:Router) { }

  
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params:ParamMap)=>{
     this.returnUrl= params.get('returnUrl')
    })
  }


  //taking values from UI 
  login(event:Event)
  {
    event.preventDefault();
    this.form=<HTMLFormElement>event.target
    this.readFromValues()
  }


  //after successfull login method user navigated to HomePage
  navigateToHomePage()
  {
    let url=this.returnUrl ? this.returnUrl :'/'
    this.router.navigateByUrl(url);
  }


  //reading values from form element
  readFromValues()
  {
    let email=(<HTMLInputElement>this.form.elements.namedItem('email')).value
    let password=(<HTMLInputElement>this.form.elements.namedItem('password')).value

    let credentials={
      email,password
    }
    
    console.log(credentials)

    //send values to user service and receive response 
    this.userService.login(credentials).subscribe
    (
      {
        next:(result)=>
        {
          this.success=result.message
          this.navigateToHomePage()
        },
        error:(response:HttpErrorResponse)=>
        {
          console.log(response.error);
          this.error=response.error.error.message
        }

      }
    )
  }

 
}
