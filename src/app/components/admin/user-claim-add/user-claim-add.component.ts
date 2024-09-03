import { Component, OnInit } from '@angular/core';
import { UserClaimService } from '../../../services/user-claim.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ClaimService } from '../../../services/claim.service';
import { Claim } from '../../../models/claim';

@Component({
  selector: 'app-user-claim-add',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-claim-add.component.html',
  styleUrl: './user-claim-add.component.css'
})
export class UserClaimAddComponent implements OnInit{

  userClaimAddForm:FormGroup = new FormGroup({});
  users:User[];
  currentUser:User;
  roles:Claim[];
  currentRole:Claim;
  constructor(private userClaimService:UserClaimService,
    private toastrService:ToastrService,
    private userService:UserService,
    private dialogRef:MatDialogRef<UserClaimAddComponent>,
    private formBuilder:FormBuilder,
    private claimService:ClaimService
  ){}
  ngOnInit(): void {
    this.createUserClaimAddForm();
    this.getAllUsers();
    this.getAllRoles();
  }

  createUserClaimAddForm(){
    this.userClaimAddForm = this.formBuilder.group({
      userId:["",Validators.required],
      operationClaimId:["",Validators.required]
    })
  }

  onUserChange(target: EventTarget|null){
    const input = target as HTMLInputElement;
    const userId = input.value;
   let user = this.users.find(u=>u.id == +userId);
   if(user){
    this.currentUser = user;
   }
  }

  onRoleChange(target: EventTarget|null){
    const input = target as HTMLInputElement;
    const operationClaimId = input.value;
   let role = this.roles.find(u=>u.id == +operationClaimId);
   if(role){
    this.currentRole = role;
   }
  }

  add(){
    if(this.userClaimAddForm.valid){
      let userClaim = Object.assign({},this.userClaimAddForm.value);
      userClaim.id=0;
      // console.log(this.currentUser);
      console.log(userClaim);
      this.userClaimService.addUserClaim(userClaim).subscribe(response=>{
        this.toastrService.success(this.currentUser.firstName + " " + this.currentUser.lastName + " assigned to " +this.currentRole.name + " role.");
        this.closeModal();
      })
    }else{
      this.toastrService.error("Form is not valid","Be careful");
    }
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(response=>{
      this.users = response.data;
    })
  }

  getAllRoles(){
    this.claimService.getAllClaims().subscribe(response=>{
      this.roles = response.data;
    })
  }

  closeModal(){
    this.dialogRef.close();
  }

}
