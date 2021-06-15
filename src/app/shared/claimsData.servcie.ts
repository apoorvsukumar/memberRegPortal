import { Injectable } from '@angular/core';
import { Claims } from './claims.model';

@Injectable()
export class ClaimsData {
  private claims: Claims[] = [
    new Claims(1, "Max", "Smith", "6/9/1986", "6/9/2021", "6/9/2021", "ABC Healthcare", 100, "Self"),
    new Claims(2, "Down", "Ashley", "05/05/1975", "6/9/2021", "6/9/2021", "Glenmark Pharma", 200, "Self"),
    new Claims(3, "Dave", "Mike", "09/30/1989", "6/9/2021", "6/9/2021", "Zydus Cadella", 300, "Dependent"),
    new Claims(4, "Smith", "Will", "11/19/1991", "6/9/2021", "6/9/2021", "Sun Pharma", 400, "Self"),
    new Claims(5, "Ina", "Rose", "04/04/1981", "6/9/2021", "6/9/2021", "Practo Hospitals", 500, "Self"),
  ];

  public getClaimById(idToSearch: number) {
    return this.claims.find(c => c.id == idToSearch);
  }

  getAllClaims() {
    return this.claims;
  }

  setClaimById(idTopUpdate: number, claim: Claims) {
    const cl = this.claims.find(c => c.id == idTopUpdate);
    cl.firstName = claim.firstName;
    cl.lastName = claim.lastName;
    cl.dob = claim.dob;
    cl.dischargeDate = claim.dischargeDate;
    cl.admissionDate = claim.admissionDate;
    cl.providerName = claim.providerName;
    cl.dependent = claim.dependent;
  }
}