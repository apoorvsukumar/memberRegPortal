import { Component, Input, OnInit, Output } from '@angular/core';
import { Claims } from '../shared/claims.model';
import { ClaimsData } from '../shared/claimsData.servcie';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ClaimsData]
})
export class DashboardComponent implements OnInit {

  // public claims: Claims[] = [
  //   new Claims(1, "Max, Smith", "06/09/1986", "ABC Healthcare"),
  //   new Claims(2, "Down, Ashley", "05/05/1975", "Glenmark Pharma"),
  //   new Claims(3, "Dave, Mike", "09/30/1989", "Zydus Cadella"),
  //   new Claims(4, "Smith, Will", "11/19/1991", "Sun Pharma"),
  //   new Claims(5, "Ina, Rose", "04/04/1981", "Practo Hospitals"),
  // ];

  // claimDetailsArray: Array<Object> = [{"name":"Max, Smith","dob":"06/09/1986","providerName":"ABC Healthcare"},
  // {"name":"Down, Ashley","dob":"05/05/1975","providerName":"Glenmark Pharma"},
  // {"name":"Jill, Robert","dob":"12/22/1990","providerName":"Apollo Network"},
  // {"name":"Dave, Mike","dob":"09/30/1989","providerName":"Zydus Cadella"},
  // {"name":"Smith, Will","dob":"11/19/1991","providerName":"Sun Pharma"},
  // {"name":"Ina, Rose","dob":"04/04/1981","providerName":"Practo Hospitals"}];

  constructor(private claimsData: ClaimsData) { }

  claims: Claims[];
  ngOnInit(): void {
    console.log("hi");
    this.claims = this.claimsData.getAllClaims();
  }

  onEditClick() {

  }

}
