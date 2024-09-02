import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarDetailService } from '../../../services/car-detail.service';
import { CarDetail } from '../../../models/car-detail';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule,
    RouterModule
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit{
  carDetails:CarDetail[]=[];
  baseUrl= 'https://localhost:44392/';
  constructor(private carDetailService:CarDetailService){};

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars(){
    this.carDetailService.getAllCars().subscribe(response=>{
      this.carDetails = response.data;
    })
  }

  getImage(cardetail:CarDetail):string{
    if(cardetail.imagePath && cardetail.imagePath.length > 0){
      return this.baseUrl + cardetail.imagePath[0];
    }else{
      return this.baseUrl + 'Uploads/Images/DefaultImage.jpg';
    }
  }


}
