import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor( public _userService:UsersService, private router:Router) { }

  home:Boolean = false;
  shop:Boolean = false;
  cart:Boolean = false;
  checkout:Boolean = false;
  orders:Boolean = false;

  ngOnInit(): void {
    this.change()
  }

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

}
