import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id:any
  product:any = {}
  cart:any[] = [];
  add:boolean = false
  amount:number = 1;
  loader:boolean = true
  userId:any = localStorage.getItem('userId')
  success:boolean = false;

  constructor(private route:ActivatedRoute, public _userService:UsersService, public _Router:Router) {
    this.id = this.route.snapshot.paramMap.get("id")
  }

  ngOnInit(): void {
    this.getSingleProduct()
  }

  getSingleProduct(){
    this.loader = true
    this._userService.getProductDetails(this.id).subscribe((res:any)=>{
      this.product = res
      this.loader = false
    }, (error)=>{
      this.loader = false
      console.log(error)
    })
  }

  addToCart(){
    if(!this._userService.isLogged()){
      this._Router.navigate(['/login'])
    }else{
      if(`cart${this.userId}` in localStorage){
        this.cart = JSON.parse(localStorage.getItem(`cart${this.userId}`)!)
        let alreadyIn = this.cart.find(Item => Item.item._id == this.product._id)
        if(alreadyIn){
          alert("product is already in your cart")
        }else{
          if(this.amount > this.product.count ){
            alert(`Out of stock, all we have is ${this.product.count}`);
            this.amount = this.product.count;
          }
          if(this.amount < 0){
            alert("Please type a valid quantity");
            this.amount = 1;
          }
          this.cart.push({item : this.product, quantity:this.amount})
          localStorage.setItem(`cart${this.userId}`, JSON.stringify(this.cart))
          this.success = true
          setTimeout(() => {
            this.success = false
          }, 3000);
        }
      }else{
        this.cart.push({item : this.product, quantity:this.amount})
        localStorage.setItem(`cart${this.userId}`, JSON.stringify(this.cart))
        localStorage.setItem(`cart${this.userId}`, JSON.stringify(this.cart))
          this.success = true
          setTimeout(() => {
            this.success = false
          }, 3000);
      }

    }
  }

}
