import { Component, OnInit } from '@angular/core';
import { CarDetail } from '../../models/car-detail';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CarService } from '../../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { Car } from '../../models/car';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  cardetails: CarDetail[] = [];
  dataLoaded = false;
  imageBaseUrl="https://localhost:44392/";

  // carResponseModel: CarResponseModel = {
  //   data:this.cars,
  //   message:"",
  //   success:true
  // };

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if(params["brandId"] && params["colorId"]){
        this.getCarByBrandAndColor(params["brandId"],params["colorId"]);
      } else if (params['brandId']) {
        this.getCarsByBrand(params['brandId']);
      } else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"]);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cardetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cardetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cardetails = response.data;
      this.dataLoaded = true;
    });
  }


  getCarByBrandAndColor(brandId:number,colorId:number){
    this.carService.getCarByBrandAndColor(brandId,colorId).
    subscribe(response=>{
      this.cardetails = response.data;
      this.dataLoaded=true;
    })
  }

  getImage(cardetail:CarDetail):string{
    if(cardetail.imagePath && cardetail.imagePath.length > 0){
      return this.imageBaseUrl + cardetail.imagePath;
    }else{
      return this.imageBaseUrl + "/Uploads/Images/DefaultImage.jpg";
    }
  }
}
