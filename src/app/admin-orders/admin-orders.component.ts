import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  constructor(private _usersService:UsersService, private build:FormBuilder) { }

  loader:Boolean = false;
  orders:any;
  order:any;
  products:any;
  empty:Boolean = false;
  popupView:Boolean = false;
  success:Boolean = false;
  successUpdate:Boolean = false;
  orderForm!:FormGroup;
  orderId:String='';
  

  ngOnInit(): void {
    this.getAllOrders();
    this.orderForm = this.build.group({
      'address':["",Validators.required],
      'total':["",Validators.required],
      'paymentStatus':["",Validators.required],
      'date':["",Validators.required],
    })
  }

  getAllOrders(){
    this.loader = true;
    this._usersService.getOrders().subscribe(res=>{
      this.orders = res;
      if(this.orders.length == 0){
        this.empty = true
      }else{
        this.empty = false
      }
      this.loader = false;
    }, error=>{
      console.log(error)
    })
  }

  getOrder(order:any){
    this.order = order;
    this.products = order.products;
    this.popupView = true;
  }

  deleteOrder(id:any){
    if(window.confirm("Are you sure to delete this order?")){
      if(id!=null){
        this._usersService.deleteOrder(id).subscribe(res=>{
          this.success = true
          setTimeout(() => {
            this.success = false
          }, 3000);
          this.getAllOrders();
        })
      }
    }else{
      console.log("Error")
    }
  }

  updateOrder(data:any){
    this._usersService.updateOrder(data.value, this.orderId).subscribe(res=>{
      this.successUpdate = true
      setTimeout(() => {
        this.successUpdate = false
      }, 3000);
      this.getAllOrders();
    }, error=>{
      console.log(error)
    })
  }

  fillForm(data:any){
    this.orderId = data._id;
    console.log(data)
    this.orderForm.controls['address'].setValue(data.address);
    this.orderForm.controls['total'].setValue(data.amount);
    this.orderForm.controls['paymentStatus'].setValue(data.paymentStatus);
    this.orderForm.controls['date'].setValue(data.createdAt);
  }
}
