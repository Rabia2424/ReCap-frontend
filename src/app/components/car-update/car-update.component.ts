import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Brand } from '../../models/brand';
import { Color } from '../../models/color';
import { CarService } from '../../services/car.service';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../../services/brand.service';
import { ColorService } from '../../services/color.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-update',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule],
  templateUrl: './car-update.component.html',
  styleUrl: './car-update.component.css'
})
export class CarUpdateComponent implements OnInit{
  carUpdateForm:FormGroup=new FormGroup({});
  brands:Brand[];
  colors:Color[];

  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private brandService:BrandService,
    private colorService:ColorService,
    private router: Router,
    private activatedRoute:ActivatedRoute)
    {};
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['carId']){
        this.getBrands();
        this.getColors();
        this.createCarUpdateForm();
        //this.carUpdateForm.patchValue({ carId: params['carId'] });
        this.getCarById(params["carId"]);
      }
    })
  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      carId: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      carName: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  getCarById(carId:number){
    this.carService.getCarDetails(carId).subscribe(response=>{
      this.carUpdateForm.patchValue({
        carId:carId,
        brandId:response.data.brandId,
        colorId:response.data.colorId,
        carName:response.data.carName,
        modelYear:response.data.modelYear,
        dailyPrice:response.data.dailyPrice,
        description:response.data.description
      });
    })
  }

  update(){
    if(this.carUpdateForm.valid){
      let carModel = Object.assign({},this.carUpdateForm.value);
      console.log(carModel);
      this.carService.update(carModel).subscribe(response=>{
        console.log(response);
        this.toastrService.success(response.message);
        this.backToCarList();
      });
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
    this.router.navigate(['car']);
  }
}
