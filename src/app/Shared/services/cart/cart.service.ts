import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import {Product} from 'src/app/Shared/models/products';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart:any={};
  private _cartObservable:BehaviorSubject<Object>;
  constructor() { 
    if(!this.isCartExists)
    {
      localStorage.setItem('cart',JSON.stringify(this.cart));
    }
    this.readCartDataFromLocalStorage()
    this._cartObservable=new BehaviorSubject(this.cart)
  }

  
  readCartDataFromLocalStorage()
  {
    if(JSON.parse(<string>localStorage.getItem('cart')) !=null)
    {
      this.cart= JSON.parse(<string>localStorage.getItem('cart'))
    }
    
  }

  writeCartDataToLocalStorage()
  {
    localStorage.setItem('cart',JSON.stringify(this.cart)) 
  }

  get cartObservable()
  {
    return this._cartObservable;
  }

  
  clearCart()
  {
    localStorage.removeItem('cart')
    this._cartObservable.next({})
  }

  addToCart(product:Product)
  {
    let quantity= this.cart[product._id];
    if(quantity)
    {
      this.cart[product._id]=(+quantity)+1
   }
    else
    {
     this.cart[product._id]=1
    }
    this._cartObservable.next(this.cart)
    localStorage.setItem('cart',JSON.stringify(this.cart))
  }





  isCartExists()
  {
    if(localStorage.getItem('cart'))
    {
      return true
    }
    else
    {
      return false
    }
  }

  getQuantity(product:Product)
  {
   return  this.cart[product._id] ? this.cart[product._id] : 0
  }

  setQuantity(product:Product,quantity:number)
  {
    if(quantity<1)
    {
      delete this.cart[product._id] 
    }
    else
    {
      this.cart[product._id]=quantity
    }
    
    this.writeCartDataToLocalStorage();
    this._cartObservable.next(this.cart);
  }


}
