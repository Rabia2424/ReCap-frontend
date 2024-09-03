import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { UserClaimService } from '../../../services/user-claim.service';
import { UserClaimDto } from '../../../models/user-claim-dto';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserClaimAddComponent } from '../user-claim-add/user-claim-add.component';
import { UserClaimDeleteComponent } from '../user-claim-delete/user-claim-delete.component';

@Component({
  selector: 'app-user-claim-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-claim-manager.component.html',
  styleUrl: './user-claim-manager.component.css'
})
export class UserClaimManagerComponent implements OnInit{
  userClaims:UserClaimDto[];

  constructor(private authService:AuthService,
    private userService:UserService,
    private toastrService:ToastrService,
    private userClaimService:UserClaimService,
    private matDialog:MatDialog
  ){}
  ngOnInit(): void {
    this.getUserOperationClaims();
  }

  showUserClaimAddModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    //dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(UserClaimAddComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result => {
      this.getUserOperationClaims();  // Refresh data after dialog closes
    });
  }

  showUserClaimDeleteModal(userClaim:UserClaimDto){
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    //dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(UserClaimDeleteComponent, {
      data:{userClaim}
    });

    modalDialog.afterClosed().subscribe(result => {
      this.getUserOperationClaims();  // Refresh data after dialog closes
    });
  }

  getUserOperationClaims(){
    this.userClaimService.getAllUserClaimsWithDetails().subscribe(response=>{
      this.userClaims= response.data;
    })
  }
}
