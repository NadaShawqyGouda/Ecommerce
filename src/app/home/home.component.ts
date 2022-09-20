import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { map, filter, scan } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allProducts:any[]= [];
  loader:boolean = true;

  constructor(private _userService: UsersService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts(){
    this.loader = true
    this._userService.fetchProducts().subscribe((res:any)=>{
      this.allProducts = res
      this.loader = false
    },error=>{
      this.loader = false
      console.log(error)
    })
  }

}
