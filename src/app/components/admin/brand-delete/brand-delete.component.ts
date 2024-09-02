import { Component, Inject, OnInit } from '@angular/core';
import { Brand } from '../../../models/brand';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrandService } from '../../../services/brand.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-delete',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './brand-delete.component.html',
  styleUrl: './brand-delete.component.css'
})
export class BrandDeleteComponent implements OnInit{
  brand:Brand;
  constructor(private brandService:BrandService,
    private toastrService:ToastrService,
    private dialogRef:MatDialogRef<BrandDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){
      this.brand = {
        brandId: 0,
        brandName: ''
      };
    };
  ngOnInit(): void {
    if (this.data && this.data.brand){
      this.brand={
        brandId:this.data.brand.brandId,
        brandName:this.data.brand.brandName
      };
    }
  }

  confirmDelete(){
    if(this.brand){
      this.brandService.delete(this.brand).subscribe(response=>{
        this.toastrService.error(this.brand.brandName + " brand deleted");
        this.closeDialog();
      },responseError=>{
        console.log(responseError);
      });
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
