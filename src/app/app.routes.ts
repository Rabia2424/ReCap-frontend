import { Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';

export const routes: Routes = [
    {path:"",pathMatch:"full", component:CarComponent},
    {path:"cars", component:CarComponent},
    {path:"cars/brand/:brandId", component:CarComponent},
    {path:"cars/color/:colorId", component:CarComponent},
    {path:"cardetails/:carId", component:CarDetailComponent},
    {path: 'cars/brand/:brandId/color/:colorId', component: CarComponent },
    {path: 'cars/payment', component: PaymentComponent },
    {path: 'cartDetail/cartItems', component: CartDetailComponent }
];
