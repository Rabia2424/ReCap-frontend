import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-navi',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    CartSummaryComponent
  ],
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css'
})
export class NaviComponent implements OnInit{
  user:User|null=null;
  dataLoaded = false;

  constructor(private authService:AuthService,
    private userService:UserService,
    private toastrService:ToastrService
  ){};
  ngOnInit(): void {
    console.log(localStorage.getItem("token"));
    this.getCurrentUser();
  }

  getCurrentUser(){
    const userId=this.authService.getUserId();
    //console.log(userId);
    if(userId!=null){
      this.userService.getUserById(userId).subscribe(response=>{
        this.user = response.data;
        console.log(this.user);
      })
    }
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  logOut(){
    this.authService.logOut();
    this.toastrService.info("Logged Out");
  }

}
