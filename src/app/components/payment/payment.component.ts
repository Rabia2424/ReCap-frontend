import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../services/payment.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RentalService } from '../../services/rental.service';
import { Rental } from '../../models/rental';
import { Payment } from '../../models/payment';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit {
  payFormGroup: FormGroup = new FormGroup({});

  constructor(
    private paymentService: PaymentService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.createPayFormGroup();
  }

  createPayFormGroup() {
    this.payFormGroup = this.formBuilder.group({
      fullName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardType: ['', Validators.required],
      expiry: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  // pay(){
  //   if (this.payFormGroup.valid) {

  //     this.toastrService.success("Payment successfull","",{
  //       progressBar:true
  //     })
  //     let rent: Rental = this.localStorageService.get(RentKey)
  //     let payment: Payment = Object.assign({

  //       customerId: rent.customerId
  //     }, this.payFormGroup.value);
  //     this.askForSave(payment);
  //     this.rentService.payAndRent(payment, rent)

  //   }else this.toastrService.error(FormIsMissing)
  // }

  pay() {
    if (this.payFormGroup.valid) {
      let payment = Object.assign({}, this.payFormGroup.value);
      console.log(payment);
      this.paymentService.pay(payment).subscribe((response) => {
        if (response.success) {
          this.toastrService.success(response.message);
          let rentals = this.rentalService.getRental();
          console.log(rentals);
          rentals?.forEach((rental) => {
            if (rental && rental.rentDate && rental.returnDate) {
              this.rentalService.add(rental).subscribe((response) => {
                if (response.success) {
                  this.toastrService.success(response.message);
                }
              });
            } else {
              this.toastrService.error('There is no rent and return date');
            }
          });
        } else {
          this.toastrService.error(response.message);
        }
      });
    }
  }

  // askForSave(payment:Payment){
  //   this.paymentService.checkIfThisCardIsAlreadySavedForThisCustomer(payment).subscribe(response=>{
  //     if (confirm(SaveYourCreditCard)) this.paymentService.add(payment)
  //   })
  // }
}
