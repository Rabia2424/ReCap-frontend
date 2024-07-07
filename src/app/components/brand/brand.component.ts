import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../models/brand';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css'
})
export class BrandComponent implements OnInit {
  brands:Brand[]=[];
  currentBrand:Brand|null;

  constructor(private brandService:BrandService){};
  
  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    });
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }

  getCurrentBrandClass(brand:Brand){
    if(this.currentBrand == brand){
      return "active";
    }else{
      return "";
    }
  }

  getAllBrandClass(){
    if(!this.currentBrand){
      return "active";
    }else{
      return "";
    }
  }

  clearCurrentBrand(){
    this.currentBrand = null;
  }

}
