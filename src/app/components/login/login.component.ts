import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup = new FormGroup({});
  rememberMe:boolean = false;
  rememberedEmail:any;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router,
    private localStorageService:LocalStorageService
  ){};

  ngOnInit(): void {
    this.createLoginForm();
    this.checkRememberedUser();
    this.autoFillEmail();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({},this.loginForm.value);

      this.authService.login(loginModel).subscribe(response=>{
        if(response.success){
          this.toastrService.success(response.message);
          this.localStorageService.setItem("token", response.data.token);
          this.localStorageService.setItem("expirationDate", response.data.expirationDate);
          if(this.rememberMe){
            this.saveEmail(loginModel.email);
          }
          this.router.navigate(['/cars']);
          setTimeout(()=>{
            window.location.reload();
          },1000);
        }
      },responseError=>{
        console.log(responseError);
        this.toastrService.error(responseError.error.message);
        this.clearForm();
      })
    }else{
      this.toastrService.error("Form is not valid!","Carefull");
    }
  }

  clearForm(){
    this.loginForm.reset();
  }

  autoFillEmail(){
    if(this.rememberedEmail){
      let email = this.localStorageService.getItem("remember");
      if(email != null){
        this.loginForm.get('email')?.setValue(email);
      }
    }
  }

  checkRememberedUser(){
    let result = this.localStorageService.getItem("remember");
    if(result){
      this.rememberedEmail = result;
    }else{
      this.rememberedEmail = undefined;
    }
  }

  deleteRememberedEmail(){
    this.localStorageService.remove("remember");
  }

  saveEmail(email:string){
    this.localStorageService.setItem("remember",email);
  }

}
