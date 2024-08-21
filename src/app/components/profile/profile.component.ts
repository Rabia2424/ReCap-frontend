import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup = new FormGroup({});
  user: User | null = null;
  dataLoaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.getCurrentUser();
    this.createProfileForm();
    this.createPasswordForm();
  }

  createProfileForm() {
    this.profileForm = this.formBuilder.group({
      id: [this.authService.getUserId()],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  createPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      userId: [this.authService.getUserId()],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatNewPassword: ['', Validators.required],
    });
  }

  getCurrentUser() {
    const userId = this.authService.getUserId();
    if (userId != null) {
      this.userService.getUserById(userId).subscribe((response) => {
        this.user = response.data;
        this.dataLoaded = true;
      });
    }
  }

  updateUserNames() {
    if (this.profileForm.valid) {
      let updatedUser = Object.assign({}, this.profileForm.value);
      this.userService.updateUserNames(updatedUser).subscribe(
        (response) => {
          if (response.success) {
            this.toastrService.success(response.message);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        },
        (responseError) => {
          console.log(responseError);
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error('Form is not valid');
    }
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      let userPasswordModel = Object.assign({}, this.passwordForm.value);
      this.authService.updatePassword(userPasswordModel).subscribe(
        (response) => {
          if (response.success) {
            this.localStorageService.setItem('token', response.data.token);
            this.toastrService.success(response.message);
            this.clearPasswordForm();
          }
        },responseError=>{
          this.toastrService.error(responseError.error.message);
        }
      );
    } else {
      this.toastrService.error('Form is not valid');
    }
  }

  clearPasswordForm(){
    this.passwordForm.reset();
  }
}
