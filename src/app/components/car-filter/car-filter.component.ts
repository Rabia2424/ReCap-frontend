import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { Color } from '../../models/color';
import { Car } from '../../models/car';
import { BrandService } from '../../services/brand.service';
import { ColorService } from '../../services/color.service';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarDetail } from '../../models/car-detail';

@Component({
  selector: 'app-car-filter',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './car-filter.component.html',
  styleUrl: './car-filter.component.css'
})

export class CarFilterComponent implements OnInit{
  brands:Brand[]=[];
  colors:Color[]=[];
  cars:CarDetail[]=[];
  isDataLoaded=false;
  selectedBrandId:number|null=null;
  selectedColorId:number|null=null;
  routeLink="";
  

  constructor(private brandService:BrandService,
    private colorService:ColorService,
    private carService:CarService
  ){}

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
      this.isDataLoaded=true;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
      this.isDataLoaded=true;
    })
  }

  changeButtonClass(){
    if(this.selectedBrandId || this.selectedColorId){
      return "btn btn-custom";
    }else{
      return "btn btn-custom disabled"
    }
  }

  changeRouteLink(){
    if(this.selectedBrandId && this.selectedColorId){
      this.routeLink="/cars/brand/"+ this.selectedBrandId + "/color/" +  this.selectedColorId;
      return this.routeLink;
    }else if(this.selectedBrandId && this.selectedColorId==undefined){
      this.routeLink="/cars/brand/" + this.selectedBrandId;
      return this.routeLink;
    }else if(this.selectedBrandId==undefined && this.selectedColorId){
      this.routeLink="/cars/color/" + this.selectedColorId;
      return this.routeLink;
    }else{
      this.routeLink=""; 
      return this.routeLink;
    }
  }

  // getCarByBrandAndColor(brandId:number,colorId:number){
  //   this.carService.getCarByBrandAndColor(brandId,colorId)
  //   .subscribe(response=>{
  //     this.cars = response.data;
  //     this.isDataLoaded=true;
  //   });
  // }

  clearFilter(){
    this.selectedBrandId=null;
    this.selectedColorId=null;
  }
}
