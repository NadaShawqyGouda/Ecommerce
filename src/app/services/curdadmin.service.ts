import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CURDAdminService {

  constructor(public _HttpClient:HttpClient) { }

  addProduct(model:any):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce-api-web.herokuapp.com/api/products/',model);
  }

  deleteProduct(id:any):Observable<any>
  {
    return this._HttpClient.delete('https://ecommerce-api-web.herokuapp.com/api/products/'+id);
  }

  updateProduct(data:any,productID:any):Observable<any>
  {
    return this._HttpClient.put('https://ecommerce-api-web.herokuapp.com/api/products/'+productID,data);
  }

  getAllProduct():Observable<any>
  {
    return this._HttpClient.get('https://ecommerce-api-web.herokuapp.com/api/products/');
  }

}
