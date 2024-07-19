import { CarDetail } from "./car-detail";

export class CartItem{
    cartId:number;
    carDetail:CarDetail;
    quantity:number;
    totalAmount:number;
    payAmount:number;
}