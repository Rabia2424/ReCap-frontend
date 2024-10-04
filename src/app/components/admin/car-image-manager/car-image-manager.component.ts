import { Component, OnInit } from '@angular/core';
import { CarImage } from '../../../models/carImage';
import { CarImageService } from '../../../services/car-image.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CarImageAddComponent } from '../car-image-add/car-image-add.component';
import { CarImageUpdateComponent } from '../car-image-update/car-image-update.component';
import { CarImageDeleteComponent } from '../car-image-delete/car-image-delete.component';

@Component({
  selector: 'app-car-image-manager',
  standalone: true,
  imports: [CommonModule,
    RouterModule],
  templateUrl: './car-image-manager.component.html',
  styleUrl: './car-image-manager.component.css'
})
export class CarImageManagerComponent implements OnInit{
  carImages:CarImage[]=[];
  baseUrl= 'https://localhost:44392/';
  constructor(private carImageService:CarImageService,
    private matDialog:MatDialog
  ){};

  ngOnInit(): void {
    this.getAllCarImages();
  }

  getAllCarImages(){
    this.carImageService.getAllCarImages().subscribe(response=>{
      this.carImages = response.data;
    })
  }

  getImage(carImage:CarImage):string{
    if(carImage.imagePath){
      return this.baseUrl + carImage.imagePath;
    }else{
      return this.baseUrl + 'Uploads/Images/DefaultImage.jpg';
    }
  }

  showCarImageAddModal(){
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    //dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(CarImageAddComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result => {
      this.getAllCarImages();  // Refresh data after dialog closes
    });
  }

  showCarImageUpdateModal(carImage:CarImage){
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    //dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";

    const dialogRef = this.matDialog.open(CarImageUpdateComponent, {
      data: { carImage }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCarImages();  // Refresh data after dialog closes
    });
  }

  showCarImageDeleteModal(carImage:CarImage){
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    //dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";

    const dialogRef = this.matDialog.open(CarImageDeleteComponent, {
      data: { carImage }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCarImages();  // Refresh data after dialog closes
    });
  }


}
