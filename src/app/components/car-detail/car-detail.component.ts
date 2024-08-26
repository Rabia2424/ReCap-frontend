import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CarDetailService } from '../../services/car-detail.service';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from '../../models/car-detail';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { VatAddedPipe } from '../../pipes/vat-added.pipe';
import { BrandComponent } from '../brand/brand.component';
import { ColorComponent } from '../color/color.component';
import { CustomerComponent } from '../customer/customer.component';
import { RentalComponent } from '../rental/rental.component';
import { RentalService } from '../../services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { Rental } from '../../models/rental';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    VatAddedPipe,
    FormsModule
  ],
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css',
})
export class CarDetailComponent implements OnInit {
  cardetails: CarDetail[] = [];
  cardetail: CarDetail;
  rentDate: Date | null;
  returnDate: Date | null;
  imageBaseUrl = 'https://localhost:44392/';
  rentalMessage: string = '';

  rentals:Rental[]=[];
  customerId:number;

  constructor(
    private cardetailService: CarDetailService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private cartService:CartService,
    private customerService:CustomerService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetails(params['carId']);
        this.getCheckRentalCarId(params['carId']);
      }
    });
    this.rentals = this.rentalService.getRental() || [];
    this.getCustomerByUserId();
  }

  getCarDetails(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      console.log(response);
      this.cardetail = response.data;
    });
  }

  getImage(cardetail: CarDetail): string[] {
    if (cardetail.imagePath && cardetail.imagePath.length > 0) {
      return cardetail.imagePath.map((path) => this.imageBaseUrl + path);
    } else {
      return [this.imageBaseUrl + 'Uploads/Images/DefaultImage.jpg'];
    }
  }

  getCheckRentalCarId(carId: number) {
    this.rentalService.getCheckRentalCarId(carId).pipe(
      catchError(error => of({ message: error.error?.message ?? 'An unknown error occurred.' }))
    ).subscribe(
      response => {this.rentalMessage = response.message
      this.toastrService.info(response.message);
  });
  }

  // addToCart(cardetail:CarDetail){
  //   this.rentalService.getCheckRentalCarId(cardetail.carId)
  //   .pipe(
  //     catchError(error => of({ message: error.error?.message ?? 'An unknown error occurred.' }))
  //   ).subscribe(response=>{
  //     const checkRentalResponse = response as { success: boolean; message: string }
  //     if(checkRentalResponse.success){
  //       this.cartService.addToCart(cardetail);
  //       this.toastrService.success(cardetail.carName+" is added to your cart");
  //     }else{
  //       this.toastrService.error(cardetail.carName+" is already rented!");
  //     }
  //   });
  // }

  getCustomerByUserId(){
    let userId = this.authService.getUserId();
    if(userId !=null){
      this.customerService.getCustomerByUserId(userId).subscribe(response=>{
        this.customerId = response.data.id;
      })
    }else{
      this.toastrService.error("User Id not found!");
    }
  }

  addToCart(cardetail:CarDetail){
    let rental:Rental={
      carId: this.cardetail.carId,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      customerId: this.customerId,
      modelFullName: '',
      fullName: cardetail.brandName + " " + cardetail.carName,
      dailyPrice: cardetail.dailyPrice,
      rentalId: 0
    }

    if(rental.rentDate && rental.returnDate){
      this.rentalService.checkRental(rental).pipe(
        catchError(error => of({ message: error.error?.message ?? 'An unknown error occurred.' }))
       ).subscribe(response=>{
        const checkRentalResponse = response as { success: boolean; message: string }
        if(checkRentalResponse.success){

          this.rentals = [...this.rentals, rental];
          console.log(this.rentals);
        if(this.rentals && this.rentals.length>0){
          this.rentalService.setRental(this.rentals);
        }
          this.cartService.addToCart(cardetail);
          this.toastrService.info(checkRentalResponse.message);
        }else{
          this.toastrService.error(checkRentalResponse.message);
        }
       })
    }else{
      this.toastrService.error("Rent date and return date required field");
    }
  }

  // checkRental(rental:Rental){
  //  rental.carId = this.cardetail.carId;
  //  rental.rentDate = this.rentDate;
  //  rental.returnDate = this.returnDate;

  //  this.rentalService.checkRental(rental).pipe(
  //   catchError(error => of({ message: error.error?.message ?? 'An unknown error occurred.' }))
  //  ).subscribe(response=>{
  //   const checkRentalResponse = response as { success: boolean; message: string }
  //   if(checkRentalResponse.success){
  //     this.toastrService.info(checkRentalResponse.message);
  //   }else{
  //     this.toastrService.error(checkRentalResponse.message);
  //   }
  //  })

  // }


}
