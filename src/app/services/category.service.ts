import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public _HttpClient:HttpClient) { }

  addCategory(data:any):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce-api-web.herokuapp.com/api/categories',data);
  }

  deleteCategory(id:any):Observable<any>
  {
    return this._HttpClient.delete('https://ecommerce-api-web.herokuapp.com/api/categories/'+id);
  }

  updateCategory(data:any,catID:any):Observable<any>
  {
    return this._HttpClient.put('https://ecommerce-api-web.herokuapp.com/api/categories/'+catID,data);
  }

  getAllCategory():Observable<any>
  {
    return this._HttpClient.get('https://ecommerce-api-web.herokuapp.com/api/categories');
  }
}
