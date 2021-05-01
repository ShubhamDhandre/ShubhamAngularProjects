import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from 'src/app/Shared/models/products';
import { ProductService } from 'src/app/Shared/services/product/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  products:Product[]=[];
  constructor(private productService:ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void
  {
    this.route.queryParamMap.subscribe({
      next:(paramMap:ParamMap)=>
      {
        let categoryId=paramMap.get('category');
        let min=paramMap.get('min');
        let max=paramMap.get('max');

        console.log(categoryId);
        this.collectProducts({category:categoryId,min,max})  
      }
    })
    
  }

  collectProducts(params:any)
  {
    this.productService.getAllProducts(params)
    .subscribe({
      next:(products)=>{
        this.products=products
      },
      error:(error)=>
      {
        console.log(error)
      }

    })
  }

}
