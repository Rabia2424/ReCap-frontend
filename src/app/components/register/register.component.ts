import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule,
    RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm:FormGroup=new FormGroup({});

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService
  ){};
  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    });
  }

  register(){
    let registerModel = Object.assign({},this.registerForm.value);
    this.authService.register(registerModel).subscribe(response=>{
      if(response.success){
        this.toastrService.success(response.message);
        localStorage.setItem("token",response.data.token);
      }
    },responseError=>{
      console.log(responseError);
    });
  }

}
