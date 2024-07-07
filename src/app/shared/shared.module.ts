import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CarComponent } from '../components/car/car.component';
import { NaviComponent } from '../components/navi/navi.component';
import { BrandComponent } from '../components/brand/brand.component'; 
import { ColorComponent } from '../components/color/color.component';
import { CustomerComponent } from '../components/customer/customer.component';
import { RentalComponent } from '../components/rental/rental.component';
import { CarDetailComponent } from '../components/car-detail/car-detail.component';


@NgModule({
  imports: [
    CommonModule,
    CarComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CarDetailComponent,
    HttpClientModule
  ],
  //providers: [provideHttpClient()] ,
  exports: [
    CarComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CarDetailComponent
  ]
})
export class SharedModule { }
