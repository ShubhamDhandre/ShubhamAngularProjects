import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Shared/services/user/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private userSerice:UserService,private router:Router) { }

  ngOnInit(): void {
  }


  //logout for Admin .navigate to login page
  logout()
  {
    this.userSerice.logout();
    this.router.navigate(['/login'])

  }

}
