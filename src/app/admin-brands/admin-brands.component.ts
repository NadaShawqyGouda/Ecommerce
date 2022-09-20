import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {BrandService} from '../services/brand.service'
@Component({
  selector: 'app-admin-brands',
  templateUrl: './admin-brands.component.html',
  styleUrls: [
    './admin-brands.component.css'
  ]
})
export class AdminBrandsComponent implements OnInit {

  constructor(public _BrandService:BrandService) {
    this.getAllBrand();
  }

  ngOnInit(): void {
    this.getAllBrand();
  }
  updateButton:boolean=false;
  addButton:boolean=true;
  brandID:any;
  searchText:String ='';
  allBrands:Array<any>=[];
  BrandForm:FormGroup=new FormGroup({
    'title':new FormControl(null,[Validators.required]),
  });

  addBrand(data:any){
    if (data.valid==true) {
      this._BrandService.addBrand(data.value).subscribe({
      next:(data)=>{this.brandID=data._id;this.getAllBrand();this.BrandForm.reset()},
      error:(error)=>console.log(error)
      })
    }
    else{
      console.log('Error');
    }
  }

  onSearchTextEntered(searchValue: string){
    this.searchText = searchValue
  }

  updateBrand(data:any){
    if (data.valid==true) {
      this._BrandService.updateBrand(data.value,this.brandID).subscribe({
        next:(data)=>{console.log('update success');this.updateButton=false;this.addButton=true;this.getAllBrand();this.BrandForm.reset()},
        error:(error)=>console.log(error)
      })
    }
    else{
      console.log('Error');
    }
  }

  deleteBrand(id:any){
    if(window.confirm('Are you sure to delete this Brand?'))
    {
      console.log(id)
    if (id!=null) {
      this._BrandService.deleteBrand(id).subscribe({
        next:(data)=>{console.log('delete success');this.getAllBrand();},
        error:(error)=>console.log(error)
      })
    }
    else{
      console.log('Error');
    }
    }
  }

  getAllBrand(){
    this._BrandService.getAllBrands().subscribe({
      next:(data)=>{this.allBrands=data},
      error:(error)=>console.log(error)
    })
  }

  
  fillForm(data:any){
    window.scroll(0,0);
    this.BrandForm.controls['title'].setValue(data.title);
    this.brandID=data._id;
    this.updateButton=true;
    this.addButton=false;
  }
}
