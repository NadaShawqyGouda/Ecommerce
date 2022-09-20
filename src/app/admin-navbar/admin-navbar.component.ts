import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private _Router:Router) { }

  clicked :Boolean = false;
  productpage :Boolean = false;
  catpage :Boolean = false;
  brandpage :Boolean = false;
  orderpage :Boolean = false;
  userpage :Boolean = false;
  statpage :Boolean = false;

  ngOnInit(): void {
    this.onChange();
  }

  logout(){
    localStorage.removeItem('token')
    this._Router.navigate(['/login'])
  }

  onChange(){
    if(this._Router.url == "/adminManageProduct"){
      this.productpage = true;
    }
    if(this._Router.url == "/adminCategory"){
      this.catpage = true;
    }
    if(this._Router.url == "/adminBrand"){
      this.brandpage = true;
    }
    if(this._Router.url == "/adminOrders"){
      this.orderpage = true;
    }
    if(this._Router.url == "/adminUsers"){
      this.userpage = true;
    }
    if(this._Router.url == "/stats"){
      this.statpage = true;
    }
  }

  toggle(){
    this.clicked = !this.clicked
  }

}
