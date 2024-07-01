import { Component, OnInit } from '@angular/core';
import { Rental } from '../../models/rental';
import { RentalService } from '../../services/rental.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rental.component.html',
  styleUrl: './rental.component.css'
})
export class RentalComponent implements OnInit{

  rentals:Rental[]=[];
  dataLoaded=false;

  constructor(private rentalService:RentalService){};

  ngOnInit(): void {
    this.getRentals();
  }

  getRentals(){
    this.rentalService.getRentals()
    .subscribe(response=>{
      this.rentals = response.data;
      this.dataLoaded=true;
    });
  }

}
