import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Claims } from '../shared/claims.model';
import { ClaimsData } from '../shared/claimsData.servcie';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-editclaim',
  templateUrl: './editclaim.component.html',
  styleUrls: ['./editclaim.component.css'],
  providers: [ClaimsData, DatePipe]
})
export class EditclaimComponent implements OnInit {
  claims: Claims;
  claimForm: FormGroup;
  startDate: FormControl;
  maxDate: Date;

  constructor(private router: Router, private route: ActivatedRoute, private claimsData: ClaimsData, private datePipe: DatePipe) { 
    this.maxDate = new Date();
  }

  mode: string;
  id: number;
dateOB: string;
dateOD: string;
dateOA: string;
  ngOnInit(): void {
    console.log("init");
    

    console.log("hi");
    this.route.params.subscribe( (param: Params) => {
      this.mode = param['mode'],
      this.id = param['id']
    });
    console.log(this.mode);
    console.log(this.id);
    this.claims = this.claimsData.getClaimById(this.id);
    console.log(this.claimsData.getClaimById(this.id));
this.dateOB = this.claims.dob.toString();
this.dateOD = this.claims.dischargeDate.toString();
this.dateOA = this.claims.admissionDate.toString();

    this.claimForm = new FormGroup({
      'firstName': new FormControl(this.claims.firstName, [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]),
      'lastName': new FormControl(this.claims.lastName,  [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]),
      'providerName': new FormControl(this.claims.providerName, [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]),
      'billAmount': new FormControl(this.claims.billAmount, Validators.required),
      'dob': new FormControl(this.datePipe.transform(this.dateOB, 'yyyy-MM-dd'), Validators.required),
      'dischargeDate': new FormControl(this.datePipe.transform(this.dateOD, 'yyyy-MM-dd'), Validators.required),
      'admissionDate': new FormControl(this.datePipe.transform(this.dateOA, 'yyyy-MM-dd'), Validators.required),
      'dependentType': new FormControl(this.claims.dependent, Validators.required)
    });
  }

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

  fetchedFN: string;
  claimToUpdate: Claims;
 onSubmit(event: Event){
  console.log("update claim");
  this.fetchedFN = this.claimForm.value;
  console.log(this.claimForm.value);
  // this.claims.firstName = event.target.

  // this.claimToUpdate = this.claimsData.getClaimById(this.id);
  this.claimsData.setClaimById(this.id, this.claimForm.value);
  console.log("after updation");
  console.log(this.claimForm);
  this.router.navigate(['dashboard']);
 }
}