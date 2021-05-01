import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Category } from 'src/app/Shared/models/categories';
import { Product } from 'src/app/Shared/models/products';
import { CategoryService } from 'src/app/Shared/services/category/category.service';
import { ProductService } from 'src/app/Shared/services/product/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products : Product[] = []
  categorySubscription: any;
  categories: Category[];
  selectedProduct : Product
  modalRef: BsModalRef;
  


  constructor(private productService:ProductService,private modalService:BsModalService,
    private categoryService:CategoryService) { }

  ngOnInit(): void 
  {
    this.collectAllProducts()
    this.collectAllCategories()
  }

  collectAllProducts()
  {
    this.productService.getAllProducts({}).subscribe
    ({
        next:(products)=>
        {
          this.products=products
        }
      })
  }

  //openmodel
  openModal(formTemplate:any,product:Product)
  {
    this.selectedProduct=product
    this.modalRef=this.modalService.show(formTemplate)
  }

  collectAllCategories() {
    this.categorySubscription = this.categoryService.getAllCategories()
      .subscribe({
        next: (categories) => {
          this.categories = categories
        }
      })
  }
  //update product
  updateProduct(productForm:HTMLFormElement)
  {
    let name = (<HTMLInputElement>productForm.elements.namedItem('name')).value
    let price = (<HTMLInputElement>productForm.elements.namedItem('price')).value
    let category = (<HTMLSelectElement>productForm.elements.namedItem('category')).value
    
    
    let values = {
      name, price, category
    }
    this.productService.updateProduct(values,this.selectedProduct._id).subscribe(
      {
        next:(value)=>
        {
          this.selectedProduct.name=name;
          this.selectedProduct.price=+price;
          this.categories.find((el,index,arr)=>
          {
            if(el._id==category)
            {
              this.selectedProduct.category=el;
            }
          })
          this.modalRef.hide()
        },
        error:(error)=>
        {

        }
      }
    )
  }



}
