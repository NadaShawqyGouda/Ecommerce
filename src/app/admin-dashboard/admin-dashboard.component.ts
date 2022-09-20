import { Component, OnInit } from '@angular/core';
import {CURDAdminService} from '../services/curdadmin.service';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  file: any // Variable to store file
  updateSuccess:Boolean = false;
  allProduct:any;
  add:Boolean = true;
  update:Boolean = false;
  productID:any;
  base64:any = '';
  img:Boolean = false;
  success:Boolean = false;
  productForm!:FormGroup;
  categories:any;
  brands:any;
  searchText:String = '';
  loader:Boolean = false;
  // Inject service 
  constructor(private _CURDAdminService:CURDAdminService, private http:HttpClient, private build:FormBuilder, private _userService:UsersService) {
    this.getAllProduct();
  }

  
  ngOnInit(): void {
    this.getAllProduct();
    this.fetchCategories();
    this.fetchBrands();
    this.productForm = this.build.group({
      'title':["",Validators.required],
      'category':["",Validators.required],
      'price':["",Validators.required],
      'description':["",Validators.required],
      'brand':["",Validators.required],
      'image':["",Validators.required],
      'count':["",Validators.required],
      'color':["",Validators.required],
      'size':["",Validators.required],
    })
  }

  reset(){
    this.productForm.get('title')?.setValue("");
    this.productForm.get('category')?.setValue("");
    this.productForm.get('price')?.setValue("");
    this.productForm.get('description')?.setValue("");
    this.productForm.get('brand')?.setValue("");
    this.productForm.get('image')?.setValue(null);
    this.productForm.get('count')?.setValue("");
    this.productForm.get('color')?.setValue("");
    this.productForm.get('size')?.setValue("");
    this.img = false;
  }

  onChange(event:any){
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.productForm.get('image')?.setValue(this.base64)
    }
    this.img = true;
  }

  addProduct(){
    const model = this.productForm.value;
    this._CURDAdminService.addProduct(model).subscribe(res =>{
      this.success = true
      setTimeout(() => {
        this.success = false
      }, 3000);
      this.reset();
      this.getAllProduct();
    }, error => {
      console.log(error)
    })
  }

  
  updateProduct(data:any){
    this._CURDAdminService.updateProduct(data.value,this.productID).subscribe(res =>{
      this.updateSuccess = true;
      this.update = false;
      this.add = true;
      this.updateSuccess = true;
      setTimeout(() => {
        this.updateSuccess = false
      }, 3000);
      this.reset();
      this.getAllProduct();
    }, error => {
      console.log(error)
    })
  }

  deleteProduct(id:any){
    if(window.confirm('Are you sure to delete this Product?')){
      if (id!=null) {
        this._CURDAdminService.deleteProduct(id).subscribe({
          next:(data)=>{this.getAllProduct()},
          error:(error)=>console.log(error)
        })
      }
      else{
        console.log('Error');
      }
    }
  }

  onSearchTextEntered(searchValue: string){
    this.searchText = searchValue
  }

  getAllProduct(){
    this.loader = true;
    this._CURDAdminService.getAllProduct().subscribe({
      next:(data)=>{this.allProduct=data,this.loader = false},
      error:(error)=>{console.log(error), this.loader=false},
    })
  }


  fetchCategories(){
    this._userService.fetchCategories().subscribe(res=>{
      this.categories = res;
    }, error=>{
      console.log(error)
    })
  }

  fetchBrands(){
    this._userService.fetchBrands().subscribe(res=>{
      this.brands = res;
    }, error=>{
      console.log(error)
    })
  }

  fillForm(data:any){
    this.add = false;
    this.productID = data._id;
    this.update = true;
    window.scroll(0,0);
    this.productForm.controls['title'].setValue(data.title);
    this.productForm.controls['category'].setValue(data.category);
    this.productForm.controls['price'].setValue(data.price);
    this.productForm.controls['description'].setValue(data.description);
    this.productForm.controls['count'].setValue(data.count);
    this.productForm.controls['color'].setValue(data.color);
    this.productForm.controls['brand'].setValue(data.brand);
    this.productForm.controls['size'].setValue(data.size);
    this.productForm.controls['image'].setValue(data.image);
    this.base64 = data.image;
    this.img = true;
  }
  

}
