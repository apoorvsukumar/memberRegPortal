import { Component, EventEmitter, OnInit, Output, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { ClaimsService } from '../shared/claimservice.servcie';

@Component({
  selector: 'app-submitclaim',
  templateUrl: './submitclaim.component.html',
  styleUrls: ['./submitclaim.component.css']
})
export class SubmitclaimComponent implements OnInit {
  claimForm: FormGroup;
  startDate: FormControl;
  maxDate: Date;
  isSubmitClicked = false;
  error = null;

  changeDate(event: any) {
    console.log(event.value);
  }

  constructor(private router: Router, private http: HttpClient, private claimService: ClaimsService) {
    console.log("constructor");
    this.maxDate = new Date();
   }

   // trigger event on discharge date selection and change max date of admission date
   @Output() dateChange:EventEmitter< MatDatepickerInputEvent< any>>;
   someMethodName(event: any) {
    let dischargedOn: moment.Moment = moment(event.value, 'M/D/YYYY');
    let admittedOn: moment.Moment = moment(this.claimForm.get("admissionDate").value, 'M/D/YYYY');
    // console.log(dischargedOn.diff(admittedOn, 'days'));
    // if discharged date is changed and admitted date is less then discharged date, then fine otherwise reset.
    if (dischargedOn.diff(admittedOn, 'days') < 0) {
      this.claimForm.get("admissionDate").reset();
    }
    console.log(event.value);
    this.startDate = event.value;
  }
  

  ngOnInit() {
    console.log("init");
    this.claimForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]),
      'lastName': new FormControl(null,  [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]),
      'providerName': new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]),
      'billAmount': new FormControl(null, Validators.required),
      'dob': new FormControl(null, Validators.required),
      'dischargeDate': new FormControl(null, Validators.required),
      'admissionDate': new FormControl(null, Validators.required),
      'dependentType': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    console.log("on submit");
    if (this.claimForm.valid) {
      this.isSubmitClicked = true;
      // this.router.navigate(['signin']);
      console.log("navigate");
      // this.router.navigate(['dashboard']);
      console.log(this.claimForm.value);
      this.claimService.submitClaim(this.claimForm.value).subscribe( responseData => {
        console.log("got response and redirecting...");
        this.router.navigate(['dashboard']);
      }, error => {
        this.error = error.message;
      });
    } else {
      // iterate throughout all form controls and 
      // 1. retrieve all the keys from the form
      // 2.  Each key is just the name of the control, so we need to retrieve the control object
      // 3. we can mark the control as touched to trigger the validation
      Object.keys(this.claimForm.controls).forEach(field => { // {1}
        const control = this.claimForm.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    }
  }


}
