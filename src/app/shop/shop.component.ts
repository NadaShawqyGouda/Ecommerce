import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products:any[] = [];
  product:any = [];
  success:Boolean = false;
  categories:any[] = [];
  amount:any = 1;
  loader!:boolean;
  userId:any = localStorage.getItem('userId');
  cart:any = []
  brands:any[] = []
  empty:Boolean = false;
  searchText:String = ''

  constructor(private _http: HttpClientModule, public _userService: UsersService) { }

  ngOnInit(): void {
    window.scroll(0,0);
    this.getSpecificProducts();
    this.getCategories();
    this.getBrands()
  }

  
  onSearchTextEntered(searchValue: string){
    this.searchText = searchValue
  }

  getSpecificProducts(){
    this.loader = true
    this._userService.fetchProducts().subscribe((res:any)=>{
      this.products = res;
      this.loader = false
    }, error=>{
      this.loader = false
      console.log(error)
    })
  }

  getCategories(){
    this.loader = true
    this._userService.fetchCategories().subscribe((res:any)=>{
      this.categories = res;
      this.loader = false
    })
  }

  getBrands(){
    this.loader = true;
    this._userService.fetchBrands().subscribe((res:any)=>{
      this.brands = res;
      this.loader = false
    })
  }


  addToCart(id:any){
    for(let i = 0; i < this.products.length; i++){
      if(this.products[i]._id == id){
        this.product = this.products[i];
      }
    }
    if(this.product.count == 0){
      alert("out of stock")
    }else{
      if(`cart${this.userId}` in localStorage){
        this.cart = JSON.parse(localStorage.getItem(`cart${this.userId}`)!)
        let alreadyIn = this.cart.find((Item:any) => Item.item._id == this.product._id)
        if(alreadyIn){
          alert("product is already in your cart")
        }else{
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
        this.success = true
        setTimeout(() => {
          this.success = false
        }, 3000);
      }
    }
  }

  chooseCategory(event:any){
    this.products = [];
    this.loader = true
    let value = event;
    this.getCategory(value)
    this.loader = false
  }

  chooseBrand(event:any){
    this.products = [];
    this.loader = true
    let value = event;
    this.getBrand(value)
    this.loader = false
  }
  getCategory(word:string){
    this._userService.getSpecificCategory(word).subscribe((res:any)=>{
      this.products = res
    })
  }

  getColor(sColor:string){
    this.loader = true;
    this._userService.getSpecificColor(sColor).subscribe((res:any)=>{
      this.products = res;
      if(this.products.length == 0){
        this.empty = true
      }else{
        this.empty= false
      }
    })
    this.loader = false
  }

  getBrand(word:string){
    this._userService.getSpecificBrand(word).subscribe((res:any)=>{
      this.products = res
    })
  }

}
