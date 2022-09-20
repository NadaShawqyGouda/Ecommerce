import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CategoryService} from '../services/category.service'

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  constructor(public _CategoryService:CategoryService) {
    this.getAllCategory();
  }

  ngOnInit(): void {}
  updateButton:boolean=false;
  addButton:boolean=true;
  searchText:String = '';
  categoryID:any;
  allCategory:Array<any>=[];

  categoryForm:FormGroup=new FormGroup({
    'title':new FormControl(null,[Validators.required]),
  });

  addCategory(data:any){
    if (data.valid==true) {
      this._CategoryService.addCategory(data.value).subscribe({
      next:(data)=>{this.categoryID=data.data._id;this.getAllCategory();this.categoryForm.reset()},
      error:(error)=>console.log(error)
      })
    }
    else{
      console.log('Error');
    }
  }

  updateCategory(data:any){
    if (data.valid==true) {
      this._CategoryService.updateCategory(data.value,this.categoryID).subscribe({
        next:(data)=>{this.updateButton=false;this.addButton=true;this.getAllCategory();this.categoryForm.reset()},
        error:(error)=>console.log(error)
      })
    }
    else{
      console.log('Error');
    }
  }

  deleteCategory(id:any){
    if(window.confirm('Are you sure to delete this Category?'))
    {
      if (id!=null) {
        this._CategoryService.deleteCategory(id).subscribe({
          next:(data)=>{this.getAllCategory();},
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

  getAllCategory(){
    this._CategoryService.getAllCategory().subscribe({
      next:(data)=>{this.allCategory=data;},
      error:(error)=>console.log(error)
    })
  }

  
  fillForm(data:any){
    this.categoryForm.controls['title'].setValue(data.title);
    this.categoryID=data._id;
    this.updateButton=true;
    this.addButton=false;
  }
}
