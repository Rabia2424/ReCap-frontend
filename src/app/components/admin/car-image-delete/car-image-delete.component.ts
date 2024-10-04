import { Component, Inject, OnInit } from '@angular/core';
import { CarImage } from '../../../models/carImage';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from '../../../services/car-image.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-car-image-delete',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './car-image-delete.component.html',
  styleUrl: './car-image-delete.component.css'
})
export class CarImageDeleteComponent implements OnInit{

  currentCarImage:CarImage;

  constructor(private toastrService:ToastrService,
    private carImageService:CarImageService,
    private dialogRef:MatDialogRef<CarImageDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){};
  ngOnInit(): void {
    this.currentCarImage = this.data.carImage;
  }

  delete(){
    const formData: FormData = new FormData();
    formData.append('id', this.currentCarImage.id.toString());
    formData.append('imagePath', this.currentCarImage.imagePath);

    this.carImageService.delete(formData).subscribe(response=>{
      this.toastrService.success(response.message);
      this.closeModal();
    })
  }

  closeModal(){
    this.dialogRef.close();
  }

}
