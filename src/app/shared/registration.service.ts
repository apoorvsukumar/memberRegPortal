import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Registration } from "./registration.model";

@Injectable()
export class RegistrationService {
    constructor(private httpClient: HttpClient) {}

    registerUser(regForm: Registration) {
        return this.httpClient.post<Registration>("http://localhost:8080/saveRegistration", regForm);
    }
}