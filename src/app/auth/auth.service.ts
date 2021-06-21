import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../shared/user.model";
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

    constructor(private httpClient: HttpClient) { }

    authenticate(username, password) {
        const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ":" + password) });
        return this.httpClient.get<User>('http://localhost:8080/validateLogin', { headers }).pipe(
            map(
                userData => {
                    let authString = 'Basic ' + btoa(username + ":" + password);
                    sessionStorage.setItem('basicauth', authString);
                    sessionStorage.setItem('username', username);
                    return userData;
                }
            )
        );
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('username');
        return !(user === null)
    }

    logOut() {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('basicauth');
    }

}