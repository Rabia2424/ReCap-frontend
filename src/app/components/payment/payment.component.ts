import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from '../../services/payment.service';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { RentalService } from '../../services/rental.service';
import { Rental } from '../../models/rental';
import { Payment } from '../../models/payment';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  payFormGroup: any;

  fullName:string;
  cardNumber:string;
  expiry:Date;
  cvv:string;

  constructor(private paymentService:PaymentService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private rentService:RentalService,
   ){};

  ngOnInit(): void {
    
  }

  // createPayFormGroup(){
  //   this.payFormGroup = this.formBuilder.group({
  //     fullName: ["", Validators.required],
  //     cardNumber: ['', Validators.required],
  //     expiry: ['', Validators.required],
  //     cvv: ['', Validators.required]
  //   })
  // }

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


  pay(){
 
  }

  // askForSave(payment:Payment){
  //   this.paymentService.checkIfThisCardIsAlreadySavedForThisCustomer(payment).subscribe(response=>{
  //     if (confirm(SaveYourCreditCard)) this.paymentService.add(payment)
  //   })
  // }

}
  

