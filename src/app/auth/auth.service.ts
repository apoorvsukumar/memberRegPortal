import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

    constructor() { }

    authenticate(username, password) {
        if (username === "admin@admin.com" && password === "Admin@123") {
            sessionStorage.setItem('username', username)
            return true;
        } else {
            return false;
        }
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('username')
        console.log(!(user === null))
        return !(user === null)
    }

    logOut() {
        sessionStorage.removeItem('username')
    }

}