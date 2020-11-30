import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { ZsquaredShopFormService } from 'src/app/services/zsquared-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number [] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];


  constructor(private formBuilder: FormBuilder,
              private zsquaredShopFormService: ZsquaredShopFormService) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirarionMonth: [''],
        expirarionYear: ['']
      })
    });

    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: +startMonth");

    this.zsquaredShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("REtrieved credit card months as:" +JSON.stringify)
        this.creditCardMonths = data;
      }
    );


    // populate credit card years

    this.zsquaredShopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years as:" +JSON.stringify)
        this.creditCardYears = data;
      }
    );

    // populate countries

    this.zsquaredShopFormService.getCountries().subscribe(
      data => {
        console.log("Countries Retrieved: " + JSON.stringify(data));
        this.countries = data;
      }
    );



  }

  copyShippingAddressToBillingAddress(event){

    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress
      .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }


  onSubmit(){
    console.log("Handling the Submit");
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("Email Address:" + this.checkoutFormGroup.get('customer').value.email)
  }

  handleMonthsAndYears(){
  
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
  
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);
  
    // if current year equals the selected year, then start with current month
  
    let startMonth: number;
  
    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }
    else{
      startMonth = 1;
    }
  
    this.zsquaredShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit cards month: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );
  }

  getStates(formGroupName: string){
    
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup.value.country.code;
    const countryName = formGroup.value.country.name;

    console.log(`{formGroupName} country code: {countryCode}`);
    console.log(`{formGroupName} country name: {countryName}`);

    this.zsquaredShopFormService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName  === 'shippingAddress'){
          this.shippingAddressStates = data;
        }else{
          this.billingAddressStates = data;
        }
        // select first item as default
        formGroup.get('state').setValue(data[0]);
      }
    );

  }
  
}




