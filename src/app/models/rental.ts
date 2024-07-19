export interface Rental{
    rentalId:number;
    carId:number;
    customerId:number;
    modelFullName:string;
    fullName:string;
    rentDate:Date|null;
    returnDate?:Date|null;
    dailyPrice:number;
}