import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Claims } from './claims.model';

@Injectable()
export class ClaimsService {

  constructor(private http: HttpClient) {}

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
    cl.dependentType = claim.dependentType;
  }

  submitClaim(claim: Claims) {
    return this.http.post('http://localhost:8080/addClaim', claim);
  }

  getAllClaim() {
    let username = "javainuse";
    let password = "password";
    const headers = new HttpHeaders({ Authorization : 'Basic' + btoa(username + ":" + password)});
    return this.http.get<Claims[]>("http://localhost:8080/findAllClaims");

  }

  deleteClaim(id: string) {
    return this.http.delete<Claims[]>("http://localhost:8080/deleteClaim/"+id);
  }

  fetchClaimById(id: string) {
    return this.http.post<Claims>("http://localhost:8080/fetchClaimById", id);
  }

  updateClaimById(claim: Claims) {
    return this.http.post<string>("http://localhost:8080/updateClaimById", claim);
  }
}