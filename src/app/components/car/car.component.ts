import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CarService } from '../../services/car.service';


@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  dataLoaded=false;

  // carResponseModel: CarResponseModel = {
  //   data:this.cars,
  //   message:"",
  //   success:true
  // };

  constructor(private carService:CarService) {}

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carService.getCars()
    .subscribe(response=>{
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
}
