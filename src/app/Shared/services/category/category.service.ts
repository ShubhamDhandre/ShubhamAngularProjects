import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/Shared/models/categories';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categoryUrl='/api/categories' 

  constructor(private http:HttpClient,private userSerive:UserService) { }


  getAllCategories(){
    return this.http.get(this.categoryUrl)
    .pipe(
      map((result:any)=>{
        return <Category[]>result['categories']
      })
    )
  }

  saveCategory(data:{title:string})
  {
    let headers=new HttpHeaders({
      'authorization':this.userSerive.getToken()
    })
    return this.http.post(this.categoryUrl,data,{headers}).
      pipe(map((result:any)=>
      {
        return result.category;
      }))
  }


}
