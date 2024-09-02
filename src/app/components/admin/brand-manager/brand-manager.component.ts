import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BrandAddComponent } from '../brand-add/brand-add.component';
import { BrandService } from '../../../services/brand.service';
import { Brand } from '../../../models/brand';
import { CommonModule } from '@angular/common';
import { BrandUpdateComponent } from '../brand-update/brand-update.component';
import { BrandDeleteComponent } from '../brand-delete/brand-delete.component';

@Component({
  selector: 'app-brand-manager',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule],
  templateUrl: './brand-manager.component.html',
  styleUrl: './brand-manager.component.css'
})
export class BrandManagerComponent implements OnInit{
  brands:Brand[];

  constructor(private toastrService:ToastrService,
    private brandService:BrandService,
    private matDialog:MatDialog
  ){ }
  ngOnInit(): void {
    this.getBrands();
  }

  showBrandAddModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    //dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(BrandAddComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result => {
      this.getBrands();  // Refresh data after dialog closes
    });
  }

  showBrandUpdateModal(brand:Brand){
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    //dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";

    const dialogRef = this.matDialog.open(BrandUpdateComponent, {
      data: { brand }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBrands();  // Refresh data after dialog closes
    });
  }

  showBrandDeleteModal(brand:Brand){
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    //dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";

    const dialogRef = this.matDialog.open(BrandDeleteComponent, {
      data: { brand }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBrands();  // Refresh data after dialog closes
    });
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }
}
