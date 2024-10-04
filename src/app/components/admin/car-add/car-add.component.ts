import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Brand } from '../../../models/brand';
import { Color } from '../../../models/color';
import { CarService } from '../../../services/car.service';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../../../services/brand.service';
import { ColorService } from '../../../services/color.service';

@Component({
  selector: 'app-car-add',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule],
  templateUrl: './car-add.component.html',
  styleUrl: './car-add.component.css'
})
export class CarAddComponent implements OnInit{

  carAddForm:FormGroup=new FormGroup({});
  brands:Brand[];
  colors:Color[];

  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private brandService:BrandService,
    private colorService:ColorService,
    private router: Router
  ){};
  ngOnInit(): void {
    this.createCarAddForm();
    this.getBrands();
    this.getColors();
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      carName:["",[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
      modelYear:["",[Validators.required,Validators.min(2000)]],
      dailyPrice:["",[Validators.required,Validators.min(6000)]],
      description:["", [Validators.required]]
    })
  };

  get carName(){
    return this.carAddForm.get('carName');
  }
  get modelYear(){
    return this.carAddForm.get('modelYear');
  }
  get dailyPrice(){
    return this.carAddForm.get('dailyPrice');
  }
  get description(){
    return this.carAddForm.get('description');
  }

  add(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value);
      this.carService.add(carModel).subscribe(data=>{
        this.toastrService.success(data.message);
        this.backToCarList();
      })
    }else{
      this.toastrService.error("Form is not valid","Careful");
    }
  }


  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }

  backToCarList(){
    this.router.navigate(['cars']);
  }

}
