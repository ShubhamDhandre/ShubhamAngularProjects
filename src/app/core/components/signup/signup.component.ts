import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/Shared/models/user';
import { UserService } from 'src/app/Shared/services/user/user.service';
import { UserOrdersComponent } from 'src/app/user/components/user-orders/user-orders.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  
  error: string;
  success : string;

  constructor(private userService: UserService , private router : Router ) { }

  ngOnInit(): void {
  }

  //After sign up it will navigate to Login page
  navigateToLoginPage(){
    this.router.navigate(['login'])
  }


  //read values from UI-form and store it in User Object
  readValuesFromForm(form: HTMLFormElement){
    
    let name = (<HTMLInputElement>form.elements.namedItem('name')).value
    let email = (<HTMLInputElement>form.elements.namedItem('email')).value
    let password = (<HTMLInputElement>form.elements.namedItem('password')).value
    let phone = (<HTMLInputElement>form.elements.namedItem('phone')).value

    let user: User = {
      name,
      email,
      password,
      phone
    };

    return user;
  }

  //fetching values of form element 
  signup(event: Event) {
    event.preventDefault();
    let form = <HTMLFormElement>event.target;
    let user = this.readValuesFromForm(form)
    this.createUser(user , form );
  }


  //send values to userservice and receive response 
  createUser(user : User , form : HTMLFormElement)
  {
    this.userService.signup(user).subscribe
    (
      {
        next : (result)=>
        {
          this.success=result.message
         
          form.reset();
          this.navigateToLoginPage();
        }, 
        error : (responce : HttpErrorResponse)=>
        {
            console.log(responce);
            this.error = responce.error.error.message
           
        }
      }
    )
  }

}
