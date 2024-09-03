import { Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { CarAddComponent } from './components/admin/car-add/car-add.component';
import { LoginComponent } from './components/login/login.component';
import { CarUpdateComponent } from './components/admin/car-update/car-update.component';
import { CarListComponent } from './components/admin/car-list/car-list.component';
import { CarDeleteComponent } from './components/admin/car-delete/car-delete.component';
import { RegisterComponent } from './components/register/register.component';
import { loginGuard } from './guards/login.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { adminPanelGuard } from './guards/admin-panel.guard';
import { BrandManagerComponent } from './components/admin/brand-manager/brand-manager.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { UserClaimManagerComponent } from './components/admin/user-claim-manager/user-claim-manager.component';

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
    {path: 'admin', component:AdminLayoutComponent,canActivate:[loginGuard,adminPanelGuard],data: { expectedRoles: ['admin'] }, children:[
      {path: 'car/list', component: CarListComponent},
      {path: 'car/add', component: CarAddComponent},
      {path: 'car/update/:carId', component: CarUpdateComponent},
      {path: 'car/delete/:carId', component: CarDeleteComponent},
      {path: 'brand/brandManager', component: BrandManagerComponent},
      {path: 'userClaim/userClaimManager', component: UserClaimManagerComponent}
    ]},
    {path: 'account/login', component: LoginComponent},
    {path: 'account/register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'unauthorized', component: UnauthorizedComponent}
];
