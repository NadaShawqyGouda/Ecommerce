import { ActivatedRoute } from '@angular/router';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:any = []
  products:any = []
  loader:boolean = true;
  userId:any;
  empty:Boolean = false;

  constructor( private route: ActivatedRoute ,private _userService: UsersService) {

  }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(){
    this.loader= true;
    this.userId = localStorage.getItem('userId');
    this._userService.getOrder(this.userId).subscribe(res=>{
      this.orders = res;
      if(this.orders.length == 0){
        this.empty = true
      }
      this.loader= false;
    }, error =>{
      this.loader=false
      console.log(error)
    })
  }

  viewProducts(data:any){
    this.products = data.products
  }


}
