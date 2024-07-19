import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';

@Component({
  selector: 'app-navi',
  standalone: true,
  imports: [RouterModule,
    CartSummaryComponent
  ],
  templateUrl: './navi.component.html',
  styleUrl: './navi.component.css'
})
export class NaviComponent {
  
}
