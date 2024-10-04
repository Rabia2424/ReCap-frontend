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
  customerId:number;
  saveCard:boolean = false;
  payWithSaveCard:boolean=false;
  savedPayments:Payment[]=[];

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
      fullName: ['', [Validators.required,Validators.minLength(5)]],
      cardNumber: ['', [Validators.required]],
      cardType: ['', Validators.required],
      expiry: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  get fullName(){
    return this.payFormGroup.get('fullName');
  }
  get cardNumber(){
    return this.payFormGroup.get('cardNumber');
  }
  get expiry(){
    return this.payFormGroup.get('expiry');
  }
  get cvv(){
    return this.payFormGroup.get('cvv');
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
    console.log(this.saveCard);
    console.log(this.payWithSaveCard);
    let rentals = this.rentalService.getRental();
    if(rentals && rentals.length>0){
      this.customerId = rentals[0].customerId;
    }
    if (this.payFormGroup.valid) {

      let payment = Object.assign({}, this.payFormGroup.value);
      payment.customerId= this.customerId;
      console.log(payment);

      if(this.saveCard){
        this.paymentService.add(payment).subscribe((response) => {
          if (response.success) {
            this.toastrService.success(response.message);
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

  if(this.payWithSaveCard==true){
    console.log(this.customerId);
    this.paymentService.pay(this.customerId).subscribe((response) => {
      if (response.success) {
        this.toastrService.success(response.message);
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

  getAllByCustomerId(customerId:number){
    this.paymentService.getAllByCustomerId(customerId).subscribe(response=>{
      this.savedPayments = response.data;
    })
  }

  onCheckboxChange(check: boolean) {
    let rentals = this.rentalService.getRental();
    if(rentals && rentals.length>0){
      this.customerId = rentals[0].customerId;
    }
    if (check) {
      this.getAllByCustomerId(this.customerId);
    }
  }
}
