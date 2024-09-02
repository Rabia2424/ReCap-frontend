import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrandService } from '../../../services/brand.service';
import { Brand } from '../../../models/brand';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-update',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule],
  templateUrl: './brand-update.component.html',
  styleUrl: './brand-update.component.css',
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm: FormGroup = new FormGroup({});
  constructor(private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService,
    private dialogRef:MatDialogRef<BrandUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.patchUpdateFormValue();
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandName:["",[Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    })
  }

  get brandName(){
    return this.brandUpdateForm.get('brandName');
  }

  patchUpdateFormValue(){
    if(this.data&& this.data.brand){
      this.brandUpdateForm.patchValue({
        brandName:this.data.brand.brandName
      });
    }
  }

  update(){
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({},this.brandUpdateForm.value);
      brandModel.brandId = this.data.brand.brandId;
      console.log(brandModel);

      if(brandModel.brandName == this.data.brand.brandName){
        this.toastrService.info("Brand name can not be same before","Invalid Update");
        return;
      }
      this.brandService.update(brandModel).subscribe(response=>{
        this.toastrService.success(this.data.brand.brandName + " updated as " +  brandModel.brandName,"Successfull Update");
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
