import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Shared/services/user/user.service';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.css']
})
export class AdminCustomersComponent implements OnInit {

  user$:any;
  constructor(private userService:UserService) { }

  ngOnInit(): void 
  {
    this.collectAllUsers()
  }

  //collect user info from getAll method userservice
  collectAllUsers()
  {
    this.user$=this.userService.getAll()
  }

}
