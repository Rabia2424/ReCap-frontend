import { Component, OnInit } from '@angular/core';
import { CarDetailService } from '../../services/car-detail.service';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from '../../models/car-detail';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule ,RouterModule],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css',
})
export class CarDetailComponent implements OnInit {
  cardetails: CarDetail[] = [];
  cardetail:CarDetail;
  rentDate: Date | null;
  returnDate: Date | null;
  imageBaseUrl="https://localhost:44392/";

  constructor(
    private cardetailService: CarDetailService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
      }
    });
  }

  getCarDetails(carId: number) {
    this.carService.getCarDetails(carId).subscribe(response => {
      console.log(response);
      this.cardetail = response.data;
    });
  }

  getImage(cardetail:CarDetail):string{
    if(cardetail.imagePath && cardetail.imagePath.length > 0){
      return this.imageBaseUrl + cardetail.imagePath;
    }else{
      return this.imageBaseUrl + "/Uploads/Images/DefaultImage.jpg";
    }
  }
  
}
