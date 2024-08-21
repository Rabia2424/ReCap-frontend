export interface Rental{
    rentalId:number;
    carId:number;
    customerId:number;
    modelFullName:string|null;
    fullName:string|null;
    rentDate:Date|null;
    returnDate?:Date|null;
    dailyPrice:number|null;
}