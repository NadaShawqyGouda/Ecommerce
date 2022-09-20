import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private _userService: UsersService, public _Router:Router) { }
  userId:any = localStorage.getItem('userId');
  message:string = ''
  cartProducts:any = []
  products:any = {}
  success:boolean = false
  total:number = 0;
  empty:boolean = false;
  address:string='';
  loading:Boolean = false;

  checkoutForm:FormGroup=new FormGroup({
    'fname':new FormControl(null,[Validators.required]),
    'lname':new FormControl(null,[Validators.required]),
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'address1':new FormControl(null,[Validators.required]),
    'address2':new FormControl(null,[Validators.required]),
    'zipCode':new FormControl(),
    'phoneNumber':new FormControl(),
    'comment':new FormControl()
  });

  ngOnInit(): void {
    this.getCartProducts()
    this.getTotalPrice()
  }

  getCartProducts(){
    if(`cart${this.userId}` in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem(`cart${this.userId}`)!)
    }else{
      this.message = 'There is nothing in cart'
    }
  }

  getTotalPrice(){
    this.total = 0
    for(let i = 0; i < this.cartProducts.length; i++){
      this.total += this.cartProducts[i].item.price * this.cartProducts[i].quantity
    }
    if(this.total == 0){
      this.empty = true
    }else{
      this.empty = false
    }
  }

  createOrder(model:any){
    this.loading = true
    let products = this.cartProducts.map((item: { item: { _id: any; image: String; title: String; price:Number }; quantity: any; }) => {
     return {productId: item.item._id,image: item.item.image, name: item.item.title, price: item.item.price, quantity: item.quantity}
    });
    let Model = {
      userId : this.userId ,
      userName: `${model.value.fname} ${model.value.lname}`,
      email : `${model.value.email}`,
      phoneNumber : `${model.value.phoneNumber}`,
      comment: `${model.value.comment}`,
      products: products,
      amount : this.total,
      address : model.value.address1,
      paymentStatus: 'pending'
    }
    
    this._userService.createOrder(Model).subscribe(res => {
      this.loading = false;
      this.success = true
      setTimeout(() => {
        this.success = false
      }, 3000);
      this._Router.navigate(['/thankyou'])
    }, error =>{
      this.loading = false;
      console.log(error)
    })
  }

}
