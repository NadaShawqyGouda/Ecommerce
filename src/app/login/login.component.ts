import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId:any = '';
  message:Boolean = false;
  loginSuccess:Boolean = false;
  loading:Boolean = false;

  loginform:FormGroup=new FormGroup({
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'password':new FormControl(null,Validators.required),
  });

  

  login(data:any){
    this.loading = true;
    if (data.valid==true) {
      this._AuthService.login(data.value).subscribe({ //[1] set a token to user who looged in , go to users.service.ts
        next:(data)=>{
          this._AuthService.id=data._id;
          this._AuthService.userEmail=data.email;
          localStorage.setItem('token', data.accessToken);
          localStorage.setItem('userId', data._id);
          const isAdmin = data.isAdmin;
           this.loading = false;
          
          if (isAdmin) {
            this.loginSuccess = true;
            setTimeout(() => {
              this._Router.navigate(['/adminManageProduct']);
            }, 3000);
          }else if(!isAdmin){;
            this.loginSuccess = true;
            setTimeout(() => {
              this._Router.navigate(['/home']);
            }, 5000);
          }
        },
        error:(error)=>{
          // handle unauthorized error
          this.loading = false;
          this.message = true;
          if(error instanceof HttpErrorResponse){
            if(error.status === 401){
              this._Router.navigate(['/login'])
            }
          }
        }
      })
    }
    else{
      console.log('error');
      console.log("an error occure");
    }
  }
    
  constructor(public _AuthService:UsersService,public _Router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this._Router.navigate(['/home'])
    }
  }

}
