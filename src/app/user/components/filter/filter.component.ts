import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/Shared/models/categories';
import { CategoryService } from 'src/app/Shared/services/category/category.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  categories:Category[]=[]
  min:any[]=[];
  max:any[]=[];
  category='';
  constructor(private CategoryService:CategoryService,private router:Router) { }

  ngOnInit(): void 
  {
    Array(10).fill('').forEach((e,index)=>{
      this.min.push((index+1)*100)
    })
    this.collectAllCategory();
  }

  setMaxvalue(minValue:any)
  {
    this.max=[]
    Array(10).fill('').forEach((e,index)=>{
      this.max.push(+minValue+((index+1)*100))
      
    })
    this.max.push(this.max[this.max.length-1]+"+")
  }


  categorySelected(category_id:string)
  {
    console.log(category_id)
    this.category=category_id;

    this.router.navigate([''],
    {
      queryParams:{'category':category_id}
    })
  }
  collectAllCategory()
  {
    this.CategoryService.getAllCategories()
    .subscribe({
      next:(categories)=>{
          this.categories=categories
      },
      error:(response:HttpErrorResponse)=>
      {
        console.log(response)
      }

    })
  }

  filter(minValue: any,maxValue: any)
  {
    let queryParams:any=
    {
      'category':this.category
    }

    if(!isNaN(minValue))
    {
      queryParams['min']=minValue
    }
    if(!isNaN(maxValue))
    {
      queryParams['max']=maxValue
    }
    
    this.router.navigate([''],
    {
      queryParams
    })

    console.log(minValue,maxValue)
  }




}
