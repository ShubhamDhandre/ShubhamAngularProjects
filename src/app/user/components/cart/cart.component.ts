import { Component, OnInit } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/Shared/models/products';
import { ProductService } from 'src/app/Shared/services/product/product.service';
import { CartService } from 'src/app/Shared/services/cart/cart.service';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { orderInfo, ProductInfo } from 'src/app/Shared/services/order/order.service';
import{OrderService} from 'src/app/Shared/services/order/order.service';
import { Router } from '@angular/router';

interface CartItem
{
  product:Product;
  quantity:any;
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart:any;
  cartItems:CartItem[]=[];
  total=0;
  cartSubscription:Subscription;
  modalRef:BsModalRef;


  constructor(private cartService:CartService,
    private modalService: BsModalService,
    private productService:ProductService,
    private OrderService:OrderService,
    private router:Router) { }

  ngOnInit(): void 
  {
    this.subscribeCart();
  }

  ngOnDestroy():void
  {
    this.cartSubscription.unsubscribe();
  }
  subscribeCart()
  {
    let total=0;
    this.cartSubscription=this.cartService.cartObservable.subscribe(
      {
        next:(cart:any)=>
        {
          let observables=[]
          total=0;
          if(Object.keys(cart).length==0)
          {
            this.cartItems=[];
          }
          for(let id in cart)
          {
            console.log(id)
            observables.push(this.productService.getProductById(id).
            pipe(
              map(product=>
                {
                  total+=(product.price*cart[id])
                  let item:CartItem=
                  {
                  product:product,
                  quantity:cart[id]
                   }
                   return item
                })

            ))
        
          }
          forkJoin(observables).subscribe({
            next:(cartItems:CartItem[])=>
            {
              //console.log(result);
              this.total=total;
              this.cartItems=cartItems
            }
          })
        }
      }
    )
  }

  openModal(form:any)
  {
    this.modalRef=this.modalService.show(form,
      {
        animated:true,
        class:'modal-lg'
      })
  }


  checkout(event:Event,form:HTMLFormElement)
  {
    event.preventDefault();
   let firstName= (<HTMLInputElement>form.elements.namedItem('firstName')).value
   let lastName= (<HTMLInputElement>form.elements.namedItem('lastName')).value
   let address= (<HTMLInputElement>form.elements.namedItem('address')).value
   
   let orderInfo:orderInfo;
   let productInfos:ProductInfo[]=[];
   
   this.cartItems.forEach(e=>
    {
      productInfos.push({
        price:e.product.price,
        productId:e.product._id,
        quantity:e.quantity
      })
    })


      orderInfo=
      {
        address,
        firstName,
        lastName,
        products:productInfos

      }

    this.OrderService.placeOrder(orderInfo).subscribe({
      next:(result:any)=>
      {
        this.modalRef.hide()
        this.cartService.clearCart()
        this.router.navigate(['orders'])
      },
      error:(err:any)=>
      {
        console.log({'err':'cant place order'})
      }
    })
   return false
  }
 
  
}
