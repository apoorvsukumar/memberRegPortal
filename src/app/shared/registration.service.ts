import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Registration } from "./registration.model";
import { map } from 'rxjs/operators';

@Injectable()
export class RegistrationService {
    constructor(private httpClient: HttpClient) {}

    registerUser(regForm: Registration) {
        return this.httpClient.post<Registration>("http://localhost:8080/saveRegistration", regForm);
    }

    fetchRegistrationByUsername(email: string) {
        return this.httpClient.post<Registration>("http://localhost:8080/fetchRegistration", email);
    }

    updateRegistration(regForm: Registration) {
        return this.httpClient.post<Registration>("http://localhost:8080/updateRegistration", regForm).pipe(
            map(
                userData => {
                    // updating the update email in browser storage. otherwise need to logout to update session data
                    let getPassword = atob(sessionStorage.getItem('basicauth').slice(6)).split(":")[1];
                    // sessionStorage.setItem("password", getPassword);

                    let authString = 'Basic ' + btoa(userData.email + ":" + getPassword);
                    sessionStorage.setItem('basicauth', authString);
                    sessionStorage.setItem('username', userData.email);
                    return userData;
                }
            )
        );;
    }
}