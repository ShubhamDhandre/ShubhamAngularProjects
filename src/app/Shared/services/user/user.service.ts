import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/Shared/models/user';
import{map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
      
  //All URls to reached till server
  private getAllUsersUrl="/api/users"
  private userSignupUrl="/api/users/signup"
  private userLoginUrl="/api/users/login"

  private isAdminUrl="/api/users/is-admin"

  private _loginObservable:BehaviorSubject<object>;


  constructor(private http:HttpClient) 
  {
    this._loginObservable=new BehaviorSubject({})
  }

   public get loginObservable()
   {
    return this._loginObservable
   }

   //After Login saveToken to local storage 
   private saveTokenToLocalStorage(token:string)
   {
    localStorage.setItem('token',"Bearer "+token)
   }



   //after Logout removes Token from LocalStorage
   logout()
   {
     localStorage.removeItem('token');
     this._loginObservable.next({})
   }


   getToken()
   {
     return localStorage.getItem('token') != null ? <string>localStorage.getItem('token') :"";
   }



   //checking user is Admin or Normal user
   isAdmin()
   {
     let headers=new HttpHeaders({
       'authorization':this.getToken()
     })
    return this.http.get(this.isAdminUrl,{headers}).pipe(
      map(result=>
        {
          return <boolean>result
        }

    ))
   }

    //get All users 
   getAll()
   {
     let headers=new HttpHeaders({
       'authorization':this.getToken()
     })
    return  this.http.get(this.getAllUsersUrl,{headers})
    .pipe(
      map((result:any)=>{
        return result.users
      })
    )
   }

   //signup with provided values 
   signup(user:User)
   {
    return  this.http.post(this.userSignupUrl,user)
    .pipe(
      map(result=>{
        return<{message:string}>result
      })
    )
   }

   //credentials passing through LoginUrl to server using post and call saveToken()
   login(credentials:{email:string,password:string})
   {
    return this.http.post(this.userLoginUrl,credentials)
    .pipe(map((result:any)=>{
      this.saveTokenToLocalStorage(result.token)
      this._loginObservable.next({})
      return result
    }))
   }


   //checking useris Login or Not
   isLoggedIn()
   {
     if(this.getToken()!='')
     {
       return  true;
     }
     {
       return false
     }
   }
}

interface loginResponse
{
  token:string,
  message:string
}