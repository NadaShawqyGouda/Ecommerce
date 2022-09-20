import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(public _HttpClient:HttpClient) { }

  addBrand(data:any):Observable<any>
  {
    return this._HttpClient.post('https://ecommerce-api-web.herokuapp.com/api/brands',data);
  }

  deleteBrand(id:any):Observable<any>
  {
    return this._HttpClient.delete('https://ecommerce-api-web.herokuapp.com/api/brands/'+id);
  }

  updateBrand(data:any,brandID:any):Observable<any>
  {
    return this._HttpClient.put('https://ecommerce-api-web.herokuapp.com/api/brands/'+brandID,data);
  }

  getAllBrands():Observable<any>
  {
    return this._HttpClient.get('https://ecommerce-api-web.herokuapp.com/api/brands');
  }
}
