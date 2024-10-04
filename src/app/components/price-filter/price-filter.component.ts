import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-price-filter',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.css'
})
export class PriceFilterComponent implements OnInit{
  minPrice:number|null;
  maxPrice:number|null;
  routeLink="";

  constructor(private router:Router){};
  ngOnInit(): void {

  }

  changeButtonClass(){
    if(this.minPrice || this.maxPrice){
      return "btn btn-custom";
    }else{
      return "btn btn-custom disabled";
    }
  }

  changeRouteLink(){
    if(this.minPrice!=null && this.maxPrice!=null){
      this.routeLink="/cars/minPrice/" + this.minPrice + "/maxPrice/" + this.maxPrice;
      return this.routeLink;
    }else if(this.minPrice!=null){
      this.routeLink="/cars/minPrice/" + this.minPrice;
      return this.routeLink;
    }else if(this.maxPrice != null){
      this.routeLink="/cars/maxPrice/" + this.maxPrice;
      return this.routeLink;
    }else{
      this.routeLink="";
      return this.routeLink;
    }
  }

  clearFilter(){
    this.minPrice=null;
    this.maxPrice=null;
  }

}
