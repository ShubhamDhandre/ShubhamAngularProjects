import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Order } from 'src/app/Shared/models/order';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderUrl='/api/orders'
  //userAllOrdersUrl='http://localhost/api/orders'



  constructor(private http:HttpClient,private userService:UserService) { }

  placeOrder(orderInfo:orderInfo)
  {
    // let headers=new HttpHeaders({
    //   'authorization':this.userService.getToken()
    // })
    //return this.http.post(this.orderUrl,orderInfo,{headers})
    return this.http.post(this.orderUrl,orderInfo)
  }


  changeStatus(data:{status:string},orderId:string)
  {
    let headers=new HttpHeaders({
      'authorization':this.userService.getToken()
    })
    return this.http.patch(this.orderUrl+'/'+orderId,data,{headers})
  }



  getUserOrder(all ?:boolean)
  {
    let url=this.orderUrl;
   if(all)
   {
    url=url+'?all=true'
   }
    let headers=new HttpHeaders({
      'authorization':this.userService.getToken()
    })
    return this.http.get(url,{headers}).pipe(
      map((result:any)=>
      {
        return result.orders
      }))
  }


  getAdminOrder()
   {
   return this.getUserOrder(true)
   
  }


}





export interface orderInfo
{
  firstName:string,
  lastName:string,
  address:string,
  products:ProductInfo[]
}

export interface ProductInfo
{
  productId:string,
  quantity:number;
  price:number;
}