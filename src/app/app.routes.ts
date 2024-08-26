import { Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { LoginComponent } from './components/login/login.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarDeleteComponent } from './components/car-delete/car-delete.component';
import { RegisterComponent } from './components/register/register.component';
import { loginGuard } from './guards/login.guard';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {path:"",redirectTo:"cars",pathMatch:"full"},
    {path:"cars", component:CarComponent},
    {path:"cars/brand/:brandId", component:CarComponent},
    {path:"cars/color/:colorId", component:CarComponent},
    {path:"cardetails/:carId", component:CarDetailComponent},
    {path:"car/cardetails/:carId", component:CarDetailComponent},
    {path: 'cars/brand/:brandId/color/:colorId', component: CarComponent },
    {path: 'cars/payment', component: PaymentComponent,canActivate:[loginGuard] },
    {path: 'cartDetail/cartItems', component: CartDetailComponent },
    {path: 'car/add', component: CarAddComponent, canActivate:[loginGuard]},
    {path: 'car/update/:carId', component: CarUpdateComponent},
    {path: 'car/delete/:carId', component: CarDeleteComponent},
    {path: 'cars/list', component: CarListComponent,canActivate:[loginGuard]},
    {path: 'account/login', component: LoginComponent},
    {path: 'account/register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent}
];
