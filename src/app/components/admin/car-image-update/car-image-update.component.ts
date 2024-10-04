import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from '../../../services/car-image.service';
import { CarService } from '../../../services/car.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CarImage } from '../../../models/carImage';

@Component({
  selector: 'app-car-image-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './car-image-update.component.html',
  styleUrl: './car-image-update.component.css'
})
export class CarImageUpdateComponent implements OnInit{

  carImageUpdateForm:FormGroup = new FormGroup({});
  selectedFile: any;
  currentCarImage:CarImage;

  constructor(private formBuilder:FormBuilder,
    private toastrService:ToastrService,
    private carImageService:CarImageService,
    private dialogRef:MatDialogRef<CarImageUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){};
  ngOnInit(): void {
    this.createCarImageUpdateForm();
    this.patchCarImageUpdateFormValue();
    console.log(this.carImageUpdateForm.get('carId')?.value);
  }

  createCarImageUpdateForm(){
    this.carImageUpdateForm = this.formBuilder.group({
      carId:["",Validators.required],
    });
  }

  patchCarImageUpdateFormValue(){
    this.carImageUpdateForm.patchValue({
      carId:this.data.carImage.carId
    })
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
        this.selectedFile = file;
    }
  }

  update(): void {
      if (this.carImageUpdateForm.valid) {
        //console.log("carId = "+ this.carImageAddForm.get('carId')?.value );
          const formData = new FormData();
          // Object.keys(this.branchForm.value).forEach(key => {
          //     formData.append(key, this.branchForm.value[key]);
          // });
          let carImageModel = Object.assign({},this.carImageUpdateForm.value);

          carImageModel.id = this.data.carImage.id;
          formData.append('carImage', JSON.stringify(carImageModel));

          if (this.selectedFile) {
              formData.append('file', this.selectedFile);
          }

          this.carImageService.update(formData).subscribe((response)=>{
            this.toastrService.success(response.message);
            this.closeModal();
          })
      }
  }

  closeModal(){
    this.dialogRef.close();
  }
}
