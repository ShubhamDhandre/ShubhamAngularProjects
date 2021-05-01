import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/Shared/models/products';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl='/api/products'
  constructor(private http:HttpClient,private userService:UserService) { }

  getAllProducts(params:any)
  {
    let query=new URLSearchParams();
    if(params['category'])
    {
      query.append('category',params['category'])
    }
    if(params['min'])
    {
      query.append('min',params['min'])
    }
    if(params['max'])
    {
      query.append('max',params['max'])
    }

    console.log(query.toString)

    return this.http.get(`${this.productUrl}?${query.toString()}`,
      {
        headers:{
          'Authorization':this.userService.getToken()
        }

      })
      .pipe(
        map((result:any) => {
          return result.products
        })
      )
  }


  //get product by id 
  getProductById(id:string)
  {
    
    return this.http.get(`${this.productUrl}/${id}`,
      {
        headers:{
          'Authorization':this.userService.getToken()
        }

      })
      .pipe(
        map((result) => {
          return <Product>result
        })
      )
  }

  //saving Product
  saveProduct(data:FormData)
  {
    // let headers=new HttpHeaders({
    //   'Authorization':this.userService.getToken()
    // })
    return this.http.post(this.productUrl,data
      
        //headers

      )
      .pipe(
        map((result:any) => {
          return <Product>result.product
        })
      )
  }


//update
updateProduct(data:any,id:any)
{
  let headers=new HttpHeaders({
    'Authorization':this.userService.getToken()
  })
  return this.http.patch(this.productUrl+ '/' + id,data,
    {
      headers

    })
    
}












}
