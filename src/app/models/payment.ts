export interface Payment{
    paymentId:number;
    customerId:number;
    fullName:string;
    cardNumber:string;
    expiry:Date;
    cvv:string;
    cardType:string;
}