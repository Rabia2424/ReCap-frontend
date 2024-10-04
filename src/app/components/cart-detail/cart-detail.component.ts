import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../models/cartItem';
import { CarDetail } from '../../models/car-detail';
import { CarService } from '../../services/car.service';
import { CartService } from '../../services/cart.service';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.css',
})
export class CartDetailComponent implements OnInit {
  cartItems: CartItem[] = [];
  carDetail: CarDetail;
  imageBaseUrl = 'https://localhost:44392/';

  rentals: Rental[] = [];

  constructor(
    private carService: CarService,
    private cartService: CartService,
    private toastrService: ToastrService,
    private rentalService: RentalService
  ) {}
  ngOnInit(): void {
    this.getCart();
  }

  getCarDetails(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.carDetail = response.data;
    });
  }

  getCart() {
    this.cartItems = this.cartService.list();
    console.log();
  }

  removeFromCart(cardetail: CarDetail) {
    this.rentals = this.rentalService.getRental() || [];
    console.log(this.rentals);
    console.log('aaa');
    //let rental = this.rentals.find((n) => n.carId === cardetail.carId);

      const index = this.rentals.findIndex((r) => r.carId == cardetail.carId);
      if (index !== -1) {
        this.rentals.splice(index, 1);
        this.rentalService.setRental(this.rentals);
        console.log(this.rentals);
        this.cartService.removeFromCart(cardetail);

    } else {
      this.toastrService.error('Rental not found!');
    }
  }

  getTotalAmount(): number {
    this.rentals = this.rentalService.getRental() || [];
    console.log(this.rentals);
    return this.rentals.reduce(
      (total, item) => {
        console.log(item.dailyPrice);
        return total + (item.dailyPrice! * this.getDays(item))
      },0);
  }

  getDays(rental: Rental): number {
    if (rental.rentDate && rental.returnDate) {
      let rentDate = new Date(rental.rentDate);
      let returnDate = new Date(rental.returnDate);
      let milisecond = returnDate.getTime() - rentDate.getTime();
      let seconds = milisecond / 1000;
      let minutes = seconds / 60;
      let hours = minutes / 60;
      let days = hours / 24;
      console.log(days+1);
      return days+1;
    } else {
      return 0;
    }
  }

  getImage(cardetail: CarDetail): string[] {
    if (cardetail.imagePath && cardetail.imagePath.length > 0) {
      return cardetail.imagePath.map((path) => this.imageBaseUrl + path);
    } else {
      return [this.imageBaseUrl + '/Uploads/Images/DefaultImage.jpg'];
    }
  }
}
