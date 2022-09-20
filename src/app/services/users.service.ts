import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( public _HttpClient:HttpClient, private _router:Router) { }
  email:string="";
  id:any;
  firstName:any;
  lastName:any;
  userEmail:any;
  register(data:any):Observable<any>
  {
    this.email=data.email;
    return this._HttpClient.post("https://ecommerce-api-web.herokuapp.com/api/auth/register",data);
  }
  login(data:any):Observable<any>
  {
    return this._HttpClient.post("https://ecommerce-api-web.herokuapp.com/api/auth/login",data);
  }
  confirmEmail(data:any):Observable<any>
  {
    return this._HttpClient.post("https://ecommerce-api-web.herokuapp.com/api/auth/verify-otp",data);
  }
  resendConfirmEmail(email:any):Observable<any>
  {
    return this._HttpClient.post("https://ecommerce-api-web.herokuapp.com/api/auth/resend-verify-otp",email);
  }
  // [2] fuction to get the token of the user to use it in authentication
  isLogged(){
    if(localStorage.getItem('token')){
      return true
    }else{
      return false
    }
  }  // after that i created guard file called auth and use this method inside it , go to auth.guard.ts

  //[5] a method that fetch the token value
  fetchToken(){
    return localStorage.getItem('token')
  }// then i will use this method in interceptor token service

  // create logout function to use it in logout button in navbar.html
  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    this._router.navigate(['/login'])
  }

  // get data from products api  (updated)
  fetchProducts(){
    return this._HttpClient.get("https://ecommerce-api-web.herokuapp.com/api/products");
  }

  fetchCategories(){
    return this._HttpClient.get("https://ecommerce-api-web.herokuapp.com/api/categories");
  }

  fetchBrands(){
    return this._HttpClient.get("https://ecommerce-api-web.herokuapp.com/api/brands");
  }

  getSpecificCategory(cat:string){
    return this._HttpClient.get('https://ecommerce-api-web.herokuapp.com/api/products?category='+cat);
  }

  getSpecificBrand(brand:string){
    return this._HttpClient.get('https://ecommerce-api-web.herokuapp.com/api/products?brand='+brand);
  }

  getSpecificColor(color:string){
    return this._HttpClient.get('https://ecommerce-api-web.herokuapp.com/api/products?color='+color);
  }

  getProductDetails(id:any){
    return this._HttpClient.get("https://ecommerce-api-web.herokuapp.com/api/products/find/"+id);
  }

  createOrder(model:any){
    return this._HttpClient.post('https://ecommerce-api-web.herokuapp.com/api/orders/', model)
  }

  getOrder(id:any){
    return this._HttpClient.get("https://ecommerce-api-web.herokuapp.com/api/orders/find/"+id)
  }

  getOrders(){
    return this._HttpClient.get("https://ecommerce-api-web.herokuapp.com/api/orders")
  }

  deleteOrder(id:any){
    return this._HttpClient.delete("https://ecommerce-api-web.herokuapp.com/api/orders/"+id)
  }

  updateOrder(data:any,id:any){
    return this._HttpClient.put("https://ecommerce-api-web.herokuapp.com/api/orders/"+id, data)
  }

  getIncome():Observable<any>
  {
    return this._HttpClient.get('https://ecommerce-api-web.herokuapp.com/api/orders/income/');
  }

  getUsers():Observable<any>
  {
    return this._HttpClient.get('https://ecommerce-api-web.herokuapp.com/api/users');
  }

  updateUser(data:any,id:any):Observable<any>
  {
    return this._HttpClient.put('https://ecommerce-api-web.herokuapp.com/api/users/'+id, data);
  }

  deleteUser(id:any):Observable<any>
  {
    return this._HttpClient.delete('https://ecommerce-api-web.herokuapp.com/api/users/'+id);
  }

}
