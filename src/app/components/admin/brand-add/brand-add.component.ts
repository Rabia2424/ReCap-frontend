import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BrandService } from '../../../services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-brand-add',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatDialogModule],
  templateUrl: './brand-add.component.html',
  styleUrl: './brand-add.component.css',
})
export class BrandAddComponent implements OnInit{
  brandAddForm:FormGroup = new FormGroup({});

  constructor(private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService,
    private router:Router,
    private dialogRef:MatDialogRef<BrandAddComponent>
  ){};
  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName:["",[Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    })
  }

  get brandName(){
    return this.brandAddForm.get('brandName');
  }

  add(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({},this.brandAddForm.value)
      this.brandService.add(brandModel).subscribe(data=>{
        this.toastrService.success(data.message);
        this.closeModal();
      },responseError=>{
        console.log(responseError);
        if(responseError.error.Errors.length >0){
          console.log(responseError);
          for(let i = 0;i < responseError.error.Errors.length;i++){
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Validation Exception!");
          }
        }
      })
    }else{
      this.toastrService.error("Form is not valid","Careful");
      this.brandAddForm.reset();
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

}
