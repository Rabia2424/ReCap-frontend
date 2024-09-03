import { Component, Inject, OnInit } from '@angular/core';
import { Claim } from '../../../models/claim';
import { ClaimService } from '../../../services/claim.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserClaimService } from '../../../services/user-claim.service';
import { UserClaimDto } from '../../../models/user-claim-dto';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserClaim } from '../../../models/user-claim';

@Component({
  selector: 'app-user-claim-delete',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-claim-delete.component.html',
  styleUrl: './user-claim-delete.component.css'
})
export class UserClaimDeleteComponent implements OnInit{

  userOperationClaim:UserClaimDto|undefined;
  roles:Claim[]=[];
  userRoles:Claim[]=[];
  userName:string;
  userClaimDeleteForm:FormGroup=new FormGroup({});
  userClaim:UserClaim|undefined;

  constructor(private claimService:ClaimService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private userClaimService:UserClaimService,
    private dialogRef:MatDialogRef<UserClaimDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){};

  ngOnInit(): void {
    this.createUserClaimDeleteForm();
    this.patchUserClaimDeleteFormValue();
    this.userName = this.data.userClaim.userFirstName + " " + this.data.userClaim.userLastName;
    this.getAllRoles();
    this.getUserClaimsByUserId();
  }

  createUserClaimDeleteForm(){
    this.userClaimDeleteForm = this.formBuilder.group({
      userId:["",Validators.required],
      operationClaimId:["",Validators.required]
    })
  }

  patchUserClaimDeleteFormValue(){
    if(this.data && this.data.userClaim){
      this.userClaimDeleteForm.patchValue({
        userId:this.data.userClaim.userId
      });
    }
  }

  getUserClaimsByUserId(){
      this.userClaimService.getAllUserClaimsWithDetails().subscribe(response=>{
        this.userOperationClaim = response.data.find(u=>u.userId === this.data.userClaim.userId);
        let userOperationClaimNames =  this.userOperationClaim?.operationClaimNames;
        console.log(userOperationClaimNames);
        if(userOperationClaimNames){
          for (let index = 0; index < userOperationClaimNames.length; index++) {
            let role = this.roles.find(u=>u.name === userOperationClaimNames[index])
            if(role){
              this.userRoles.push(role);
            }
          }
          console.log(this.userRoles);
        }

      })
  }

  getAllRoles(){
    this.claimService.getAllClaims().subscribe(response=>{
      this.roles = response.data;
    })
  }

  async delete(){
    if(this.userClaimDeleteForm.valid){
      let userClaimModel = Object.assign({},this.userClaimDeleteForm.value);

      const response = await this.userClaimService.getAllUserClaims().toPromise();
        if(response && response.data){
          this.userClaim = response.data.find(u=>u.userId == userClaimModel.userId && u.operationClaimId == userClaimModel.operationClaimId);
        }


      if(this.userClaim){
        userClaimModel.id = this.userClaim.id;
      }
      console.log(userClaimModel);

      this.userClaimService.deleteUserClaim(userClaimModel).subscribe(response=>{
        this.toastrService.success(response.message);
        this.closeModal();
      });
    }else{
      this.toastrService.error("Form is not valid","Careful");
    }
  }

  closeModal(){
    this.dialogRef.close();
  }
}
