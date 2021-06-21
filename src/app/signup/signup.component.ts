import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CustomValidators } from '../custom-validators';
import { Registration } from '../shared/registration.model';
import { RegistrationService } from '../shared/registration.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  age: number;
  error = false;

  countryList: Array<any> = [
    { name: 'Germany', states: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn'] },
    { name: 'Spain', states: ['Barcelona'] },
    { name: 'USA', states: ['Downers Grove'] },
    { name: 'Mexico', states: ['Puebla'] },
    { name: 'China', states: ['Beijing'] },
    { name: 'India', states: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'] },
  ];
  states: Array<any> = [];
  changeCountry(count) {
    this.states = this.countryList.find(con => con.name == count).states;
  }

  @Output() dateChange:EventEmitter<MatDatepickerInputEvent<any>>;
  someMethodName(event: any) {
    console.log("hi");  
    console.log(event.value);
 console.log(moment().diff(event.value, 'years'));

  }

  // minDate: Date;
  maxDate: Date;

  constructor(private router: Router, private registrationService: RegistrationService) {
    this.maxDate = new Date();
  }

  // constructor() { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]),
      'address': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'state': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[^A-Za-z0-9]/, { hasSpecialCharacters: true }),
        Validators.minLength(8)
      ]),
      'pan': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$')]),
      'contactNo': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      'dob': new FormControl(null, Validators.required)
    })
  }
  // ^((\\+91-?)|0)?[0-9]{10}$

  regObject: Registration;
  onSubmit() {
    this.error = false;
    console.log(this.signupForm);
    console.log("Registration successful");
    console.log(this.signupForm.valid);

    
    if (this.signupForm.valid) {
      this.regObject = new Registration(
        this.signupForm.value.name,
        this.signupForm.value.address,
        this.signupForm.value.country,
        this.signupForm.value.state,
        this.signupForm.value.email,
        this.signupForm.value.password,
        this.signupForm.value.pan,
        this.signupForm.value.contactNo,
        this.signupForm.value.dob,
        null
      );
      this.registrationService.registerUser(this.regObject).subscribe( responseData => {
        if (responseData == null) {
          this.error = true;
        } else {
          this.router.navigate(['signin']);
        }
      });
    } else {
      // iterate throughout all form controls and 
      // 1. retrieve all the keys from the form
      // 2.  Each key is just the name of the control, so we need to retrieve the control object
      // 3. we can mark the control as touched to trigger the validation
      Object.keys(this.signupForm.controls).forEach(field => { // {1}
        const control = this.signupForm.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    }

  }

}
