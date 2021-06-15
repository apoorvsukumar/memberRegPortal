import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SubmitclaimComponent } from './submitclaim/submitclaim.component';
import { EditclaimComponent } from './editclaim/editclaim.component';

const appRoutes: Routes = [
  { path: '' , component: SigninComponent },
  { path: 'signin' , component: SigninComponent },
  { path: 'signup' , component: SignupComponent},
  { path: 'dashboard' , component: DashboardComponent},
  { path: 'claimPage' , component: SubmitclaimComponent},
  { path: 'editClaim/:mode/:id' , component: EditclaimComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    SubmitclaimComponent,
    EditclaimComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
