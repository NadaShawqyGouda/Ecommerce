import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { isEmpty } from 'rxjs';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor( private http:HttpClient, public _userService:UsersService) { }

  income:Number = 0;
  loader!:Boolean;
  products:any = [];
  orders:any = [];
  usersNum:any = 0;

  ngOnInit(): void {
    this.getIncome();
    this.getOrdersLengtth();
    this.getProductsLengtth();
    this.getUsersNum();
  }

  getIncome(){
    this.loader = true;
    this._userService.getIncome().subscribe(res=>{
      this.income = res[0].total;
      this.loader = false;
    }, err => {
      console.log(err);
      this.loader = false;
    })
  }

  getOrdersLengtth(){
    this.loader = true;
    this._userService.getOrders().subscribe(res=>{
      this.orders = res;
      this.loader = false;
    }, err=>{
      console.log(err);
      this.loader = false;
    })
  }

  getProductsLengtth(){
    this.loader = true;
    this._userService.fetchProducts().subscribe(res=>{
      this.products = res;
      this.loader = false;
    }, err=>{
      console.log(err);
      this.loader = false;
    })
  }

  getUsersNum(){
    this.loader = true;
    this._userService.getUsers().subscribe(res=>{
      this.usersNum = res;
      this.loader = false;
    }, err=>{
      console.log(err);
      this.loader = false;
    })
  }


}
