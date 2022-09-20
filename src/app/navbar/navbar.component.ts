import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  products:any = []
  numOfProducts:any;
  search:boolean = false;
  home:Boolean = false;
  shop:Boolean = false;
  cart:Boolean = false;
  checkout:Boolean = false;
  orders:Boolean = false;

  userId:any = localStorage.getItem('userId');

  constructor(public _userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.change()
  }

  clicked :Boolean = false;

  change(){
    if(this.router.url == "/home"){
      this.home = true;
    }
    if(this.router.url == "/shop"){
      this.shop = true;
    }
    if(this.router.url == "/cart"){
      this.cart = true;
    }
    if(this.router.url == "/checkout"){
      this.checkout = true;
    }
    if(this.router.url == "/orders"){
      this.orders = true;
    }
  }
  toggle(){
    this.clicked = !this.clicked
  }


}
