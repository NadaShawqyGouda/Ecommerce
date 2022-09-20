import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styles: [
  ]
})
export class AdminFooterComponent implements OnInit {

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



}
