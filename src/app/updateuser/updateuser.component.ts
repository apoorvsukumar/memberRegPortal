import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CustomValidators } from '../custom-validators';
import { Registration } from '../shared/registration.model';
import { RegistrationService } from '../shared/registration.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css'],
  providers: [DatePipe]
})
export class UpdateuserComponent implements OnInit {
  signupForm: FormGroup;
  maxDate: Date;
  errorWhileUpdate = false;

  constructor(private router: Router, private route: ActivatedRoute, 
    private registrationService: RegistrationService, private datePipe: DatePipe) {
    this.maxDate = new Date();
  }

  countryList: Array<any> = [
    { name: 'Germany', states: ['Duesseldorf', 'Leinfelden-Echterdingen', 'Eschborn'] },
    { name: 'Spain', states: ['Barcelona'] },
    { name: 'USA', states: ['Downers Grove', 'Washington DC', 'New York City', 'Oregon', 'Ohio', 'Nebraska', 'Manhattan', 'New Jersey'] },
    { name: 'Mexico', states: ['Puebla'] },
    { name: 'China', states: ['Beijing'] },
    {
      name: 'India', states: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim',
        'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']
    },
  ];
  states: Array<any> = [];

  mode: string;
  id: string;
  ngOnInit() {
    this.fetchRegistrationByUsername(sessionStorage.getItem('username'));
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

  registrationData: Registration;
  dateOB: string;
  regBoject: Registration;
  oldEmail: string;
  fetchRegistrationByUsername(username: string) {
    console.log("sending username : "+username);
    this.registrationService.fetchRegistrationByUsername(username).subscribe(responseData => {
      console.log("response");
      console.log(responseData);
      this.registrationData = responseData;
      this.dateOB = this.registrationData.dob.toString();
      this.states = this.countryList.find(con => con.name == this.registrationData.country).states;
      this.oldEmail = this.registrationData.email;

      this.signupForm = new FormGroup({
        'name': new FormControl(this.registrationData.name, [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]),
        'address': new FormControl(this.registrationData.address, Validators.required),
        'country': new FormControl(this.registrationData.country, Validators.required),
        'state': new FormControl(this.registrationData.state, Validators.required),
        'email': new FormControl(this.registrationData.email, [Validators.required, Validators.email]),
        'password': new FormControl(this.registrationData.password, [Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[^A-Za-z0-9]/, { hasSpecialCharacters: true }),
        Validators.minLength(8)
        ]),
        'pan': new FormControl(this.registrationData.pan, [Validators.required, Validators.pattern('^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$')]),
        'contactNo': new FormControl(this.registrationData.contactNo, [Validators.required, Validators.pattern("^[0-9]{10}$")]),
        'dob': new FormControl(this.datePipe.transform(this.dateOB, 'yyyy-MM-dd'), Validators.required)
      });
    })
  }

  regObject: Registration;
  onSubmit() {
    this.errorWhileUpdate = false;
    console.log(this.signupForm);
    console.log("Registration updateing...");

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
        this.oldEmail
      );
      this.registrationService.updateRegistration(this.regObject).subscribe(responseData => {
        if (responseData == null) {
          this.errorWhileUpdate = true;
        } else {
          this.router.navigate(['dashboard']);
        }
      }, error => {
        this.errorWhileUpdate = true;
        console.log(error);
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
