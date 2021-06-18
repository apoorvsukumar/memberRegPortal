import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';

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
import { ClaimsService } from './shared/claimservice.servcie';
import { AuthService } from './auth/auth.service';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuardService } from './auth/authguard.service';

const appRoutes: Routes = [
  { path: '' , component: SigninComponent },
  { path: 'signin' , component: SigninComponent },
  { path: 'signup' , component: SignupComponent},
  { path: 'dashboard' , component: DashboardComponent, canActivate:[AuthGuardService]},
  { path: 'claimPage' , component: SubmitclaimComponent, canActivate:[AuthGuardService]},
  { path: 'editClaim/:mode/:id' , component: EditclaimComponent, canActivate:[AuthGuardService]},
  { path: 'logout' , component: LogoutComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    DashboardComponent,
    SubmitclaimComponent,
    EditclaimComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [
    ClaimsService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
