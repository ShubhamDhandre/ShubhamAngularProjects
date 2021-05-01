import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-card',
  templateUrl: './admin-dashboard-card.component.html',
  styleUrls: ['./admin-dashboard-card.component.css']
})
export class AdminDashboardCardComponent implements OnInit {

  //intercomponent comm' bet admin-dashboard and admin dashboard card comp
  //taking values from dashboard comp into card comp and displaying into card html

  @Input('value')
  value:number

  @Input('color')
  color:string

  constructor() { }

  ngOnInit(): void {
  }

}
