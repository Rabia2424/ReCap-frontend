import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Brand } from '../../../models/brand';
import { Color } from '../../../models/color';
import { CarService } from '../../../services/car.service';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../../../services/brand.service';
import { ColorService } from '../../../services/color.service';


@Component({
  selector: 'app-car-delete',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './car-delete.component.html',
  styleUrl: './car-delete.component.css',
})
export class CarDeleteComponent implements OnInit {
  carDeleteForm: FormGroup = new FormGroup({});
  brands: Brand[] = [];
  colors: Color[] = [];

  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private brandService:BrandService,
    private colorService:ColorService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ){};

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.createCarDeleteForm();
        this.getCarById(params["carId"]);
      }
    })
  }

  createCarDeleteForm(){
    this.carDeleteForm = this.formBuilder.group({
      carId: ['', Validators.required],
      brandName: ['', Validators.required],
      colorName: ['', Validators.required],
      carName: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  getCarById(carId:number){
    this.carService.getCarDetails(carId).subscribe(response=>{
      this.carDeleteForm.patchValue({
        carId:carId,
        brandName:response.data.brandName,
        colorName:response.data.colorName,
        carName:response.data.carName,
        modelYear:response.data.modelYear,
        dailyPrice:response.data.dailyPrice,
        description:response.data.description
      });
    })
  }

  delete(){
    if(this.carDeleteForm.valid){
      let carModel = Object.assign({}, this.carDeleteForm.value);
      carModel.brandId = this.brands.find(n=>n.brandName == carModel.brandName)?.brandId;
      carModel.colorId = this.colors.find(n=>n.colorName == carModel.colorName)?.colorId;

      this.carService.delete(carModel).subscribe(response=>{
        this.toastrService.success(response.message);
        this.backToCarList();
      })
    }else{
      this.toastrService.error("Form is not valid","Careful");
    }
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    });
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }

  backToCarList(){
    this.router.navigate(["car"]);
  }
}
