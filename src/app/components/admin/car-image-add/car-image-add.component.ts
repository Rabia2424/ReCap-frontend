import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from '../../../services/car-image.service';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { Car } from '../../../models/car';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-car-image-add',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './car-image-add.component.html',
  styleUrl: './car-image-add.component.css'
})
export class CarImageAddComponent implements OnInit{

  carImageAddForm:FormGroup = new FormGroup({});
  // progress: number;
  // message: string;
  // @Output() public onUploadFinished = new EventEmitter();
  selectedFile: any;
  cars:Car[];

  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private carImageService:CarImageService,
    private carService:CarService,
    private dialogRef:MatDialogRef<CarImageAddComponent>
  ){};
  ngOnInit(): void {
    this.createCarImageAddForm();
    this.getAllCars();
  }

  createCarImageAddForm(){
    this.carImageAddForm = this.formBuilder.group({
      carId:["",Validators.required],
    });
  }

  getAllCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars = response.data;
    })
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
        this.selectedFile = file;
    }
  }

  add(): void {
      if (this.carImageAddForm.valid) {
        //console.log("carId = "+ this.carImageAddForm.get('carId')?.value );
          const formData = new FormData();
          // Object.keys(this.branchForm.value).forEach(key => {
          //     formData.append(key, this.branchForm.value[key]);
          // });
          let carImageModel = Object.assign({},this.carImageAddForm.value);

          formData.append('carImage', JSON.stringify(carImageModel));

          if (this.selectedFile) {
              formData.append('file', this.selectedFile);
          }

          this.carImageService.add(formData).subscribe(response=>{
            this.toastrService.success(response.message);
            this.closeModal();
          })
      }
  }

  closeModal(){
    this.dialogRef.close();
  }


}
