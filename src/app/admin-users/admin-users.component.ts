import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private _userService: UsersService) { }

  success:Boolean = false;
  successUpdate:Boolean = false;
  empty:Boolean = false;
  loader:Boolean = false;
  users:any;

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(){
    this.loader = true;
    this._userService.getUsers().subscribe(res=>{
      this.users = res;
      this.loader = false;
    }, err=>{
      console.log(err);
      this.loader = false
    })
  }

  toggle(user:any){
    const value = !user.isAdmin;
    const model = {
      isAdmin : value
    }
    this._userService.updateUser(model, user._id).subscribe(res=>{
      this.successUpdate = true
      setTimeout(() => {
        this.successUpdate = false
      }, 3000);
      this.getAllUsers();
    }, err=>{
      console.log(err)
    })
  }

  deleteUser(user:any){
    this._userService.deleteUser(user._id).subscribe(res=>{
      this.success = true
      setTimeout(() => {
        this.success = false
      }, 3000);
      this.getAllUsers();
    },err=>{
      console.log(err)
    })
  }
}
