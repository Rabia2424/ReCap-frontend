import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  rememberMe: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService:LocalStorageService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).subscribe(
        (response) => {
          if (response.success) {
            this.toastrService.success(response.message);
            localStorage.setItem('token', response.data.token);
            if (this.rememberMe) {
              this.saveEmail(registerModel.email);
            }
            this.router.navigate(['/account/login']);
            setTimeout(()=>{
              window.location.reload();
            },100);
          }
        },
        (responseError) => {
          console.log(responseError);
        }
      );
    }else{
      this.toastrService.error("Form is not valid", "Be careful!");
    }
  }

  saveEmail(email:string){
    this.localStorageService.setItem("remember",email);
  }
}
