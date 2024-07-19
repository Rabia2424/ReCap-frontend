import { Injectable } from '@angular/core';
import { CarDetail } from '../models/car-detail';
import { CartItems } from '../models/cartItems';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(cardetail:CarDetail){
    let item = CartItems.find(c=>c.carDetail.carId == cardetail.carId);
    if(item){
      item.quantity+=1;
      item.totalAmount = (item.carDetail.dailyPrice)*(item.quantity);
    }else{
      let cartItem = new CartItem();
      cartItem.carDetail = cardetail;
      cartItem.quantity = 1;
      cartItem.totalAmount = cardetail.dailyPrice;
      CartItems.push(cartItem);
    }
  }

  list():CartItem[]{
    return CartItems;
  }

  removeFromCart(cardetail:CarDetail){
    let item = CartItems.find(c=>c.carDetail.carId == cardetail.carId);
    if(item){
      CartItems.splice(CartItems.indexOf(item),1);
    }
  }


}
