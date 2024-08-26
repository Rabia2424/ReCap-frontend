import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutlet } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { CarComponent } from './components/car/car.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    CarComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CarDetailComponent,
    CarFilterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  private tokenCheckInterval:any;
  constructor(private authService:AuthService){};
  ngOnInit(): void {
    // Check the token expiration immediately when the app initializes
    this.authService.checkTokenExpiration();

    // Then set an interval to check every 60 seconds
    this.tokenCheckInterval = setInterval(() => {
      this.authService.checkTokenExpiration();
    }, 60000); // 60000 milliseconds = 60 seconds
  }

  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
    }
  }

  title = 'recap';
}
