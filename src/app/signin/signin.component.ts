import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CustomValidators } from '../custom-validators';
import { Users } from '../Users/users.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  showInvalidCredError: Boolean = false;
  constructor(private router: Router, private loginservice: AuthService) { }

  ngOnInit() {
    //called before template is rendered.
    this.signinForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[^A-Za-z0-9]/, { hasSpecialCharacters: true }),
        Validators.minLength(8)
      ])
    });
  }

  onSubmit() {
    console.log(this.signinForm);
    console.log("submitted");
    // this.signinForm.reset();
    if (this.signinForm.value.username == "admin@admin.com" && this.signinForm.value.password == "Admin@123") {
      console.log("Welcome");
      this.router.navigate(['dashboard']);
    } else {
      this.signinForm.reset();
      this.showInvalidCredError = true;
    }
    
  }

  invalidLogin = false;
  username: string;
  password: string;
  checkLogin() {
    if (this.loginservice.authenticate(this.signinForm.value.username, this.signinForm.value.password)
    ) {
      this.router.navigate(['/dashboard'])
      this.invalidLogin = false
    } else
      this.invalidLogin = true;
      this.signinForm.reset();
      this.showInvalidCredError = true;
  }

  loadedFeature = 'signin';
  title = 'my-first-app';
  onNavigate(feature: string) {
    console.log("on navigate "+feature);
    this.loadedFeature = feature;
  }



}
