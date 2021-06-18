import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Claims } from '../shared/claims.model';
import { ClaimsService } from '../shared/claimservice.servcie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ClaimsService]
})
export class DashboardComponent implements OnInit {

  constructor(private claimsService: ClaimsService, private http: HttpClient, public authService: AuthService) { }

  claims: Claims[] = [];
  error = null;
  noRecordsFound = false;
  ngOnInit(): void {
    console.log("hi");
    // this.claims = this.claimsData.getAllClaims();
    this.fetchAllClaims();
  }

  onEditClick() {

  }

  fetchAllClaims() {
    console.log("fetching all claims...");

    this.claimsService.getAllClaim().subscribe( responseData => {
      this.claims = responseData;
      if (this.claims.length < 1) {
        this.noRecordsFound = true;
      }
      console.log(responseData);
      console.log("fetching completes");
    }, error => {
      this.noRecordsFound = false;
      console.log("error");
      console.log(error);
      this.error = error.message;
    });
  }

  deleteClaim(id: string) {
    console.log(id);
    this.claimsService.deleteClaim(id).subscribe( responseData => {
      console.log(responseData);
      this.claims = responseData;
    });
  }

}
