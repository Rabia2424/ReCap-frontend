import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CarDetail } from '../../models/car-detail';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule,
    RouterModule
  ],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent implements OnInit {

  cartItems:CartItem[] = [];
  currentCart:CartItem;
  constructor(private cartService:CartService,
    private toastrService:ToastrService,
    private rentalService:RentalService
  ){}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartItems = this.cartService.list();
  }

  setCurrentCart(cartItem:CartItem){
    this.currentCart = cartItem;
    this.toastrService.info("You directed to your cart");
  }

  removeFromCart(cardetail:CarDetail){
    this.cartService.removeFromCart(cardetail);
    let rentals = this.rentalService.getRental();
    if(rentals){
      const index = rentals.findIndex((r) => r.carId == cardetail.carId);
      if (index !== -1) {
        rentals.splice(index, 1);
        this.rentalService.setRental(rentals);
      }
    }

  }

}
