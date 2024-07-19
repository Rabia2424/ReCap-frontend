import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../models/cartItem';
import { CarDetail } from '../../models/car-detail';
import { CarService } from '../../services/car.service';
import { CartService } from '../../services/cart.service';
import { CartItems } from '../../models/cartItems';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';

@Component({
  selector: 'app-cart-detail',
  standalone: true,
  imports: [CommonModule,
    RouterModule
  ],
  templateUrl: './cart-detail.component.html',
  styleUrl: './cart-detail.component.css'
})
export class CartDetailComponent implements OnInit {
  cartItems:CartItem[]=[];
  carDetail:CarDetail;
  imageBaseUrl = 'https://localhost:44392/';

  constructor(private carService:CarService,
    private cartService:CartService,
    private rentalService:RentalService
  ){};
  ngOnInit(): void {
    this.getCart();
  }

  getCarDetails(carId:number){
    this.carService.getCarDetails(carId)
    .subscribe(response=>{
      this.carDetail = response.data;
    })
  }

  getCart(){
    this.cartItems = this.cartService.list();
  }

  removeFromCart(cardetail:CarDetail){
    this.cartService.removeFromCart(cardetail);
  }

  getTotalAmount():number{
    return CartItems.reduce((total,item)=> total + item.totalAmount,0);
  }


  getImage(cardetail:CarDetail):string[]{
    if(cardetail.imagePath && cardetail.imagePath.length > 0){
      return cardetail.imagePath.map((path)=> this.imageBaseUrl + path);
    }else{
      return [this.imageBaseUrl + '/Uploads/Images/DefaultImage.jpg'];
    }
  }


}
