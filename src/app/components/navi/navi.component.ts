import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../services/local-storage.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { CarAddComponent } from '../admin/car-add/car-add.component';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-navi',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    CartSummaryComponent,
  ],
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css'
})
export class NaviComponent implements OnInit{
  user:User|null=null;
  dataLoaded = false;

  constructor(private authService:AuthService,
    private userService:UserService,
    private toastrService:ToastrService,
    private matDialog:MatDialog
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


  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    //dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }

}
